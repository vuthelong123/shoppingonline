const express = require('express');
const router = express.Router();

// utils
const CryptoUtil = require('../utils/CryptoUtil');
const EmailUtil = require('../utils/EmailUtil');
const JwtUtil = require('../utils/JwtUtil');

// daos
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');
const CustomerDAO = require('../models/CustomerDAO');
const OrderDAO = require('../models/OrderDAO');

// --- CATEGORY API ---
router.get('/categories', async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});

// --- PRODUCT API ---
router.get('/products/new', async function (req, res) {
  const products = await ProductDAO.selectTopNew(8);
  res.json(products);
});

router.get('/products/hot', async function (req, res) {
  const products = await ProductDAO.selectTopHot(8);
  res.json(products);
});

router.get('/products/category/:cid', async function (req, res) {
  const _cid = req.params.cid;
  const products = await ProductDAO.selectByCatID(_cid);
  res.json(products);
});

router.get('/products/search/:keyword', async function (req, res) {
  const keyword = req.params.keyword;
  const products = await ProductDAO.selectByKeyword(keyword);
  res.json(products);
});

router.get('/products/:id', async function (req, res) {
  const _id = req.params.id;
  const product = await ProductDAO.selectByID(_id);
  res.json(product);
});

// --- CUSTOMER API ---

// SIGNUP: tự active luôn, không gửi email
router.post('/signup', async function (req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;

    const dbCust = await CustomerDAO.selectByUsernameOrEmail(username, email);

    if (dbCust) {
      res.json({ success: false, message: 'Tài khoản hoặc email đã tồn tại' });
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otp_expire = new Date().getTime() + 5 * 60 * 1000; // 5 mins

      const newCust = {
        username: username,
        password: password,
        name: name,
        phone: phone,
        email: email,
        active: 0,
        token: '',
        otp: otp,
        otp_expire: otp_expire
      };

      const result = await CustomerDAO.insert(newCust);

      if (result) {
        try {
          await EmailUtil.send(email, otp);
          res.json({
            success: true,
            message: 'Thành công, vui lòng kiểm tra email để lấy mã OTP.'
          });
        } catch (err) {
          console.error(err);
          res.json({
            success: false,
            message: 'Lỗi gửi email xác thực'
          });
        }
      } else {
        res.json({
          success: false,
          message: 'Insert failure'
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: 'Server error'
    });
  }
});

// VERIFY OTP
router.post('/verify-otp', async function (req, res) {
  const email = req.body.email;
  const otp = req.body.otp;

  const customer = await CustomerDAO.selectByEmail(email);
  if (customer) {
    if (customer.otp === otp) {
      if (new Date().getTime() < customer.otp_expire) {
        const result = await CustomerDAO.activeByOTP(customer._id);
        res.json({ success: true, message: 'Thành công' });
      } else {
        res.json({ success: false, message: 'Mã xác thực đã hết hạn' });
      }
    } else {
      res.json({ success: false, message: 'Mã xác thực không đúng' });
    }
  } else {
    res.json({ success: false, message: 'Tài khoản không tồn tại' });
  }
});

// LOGIN
router.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    const customer = await CustomerDAO.selectByUsernameAndPassword(username, password);

    if (customer) {
      if (customer.active === 1) {
        const token = JwtUtil.genToken();

        res.json({
          success: true,
          message: 'Thành công',
          token: token,
          customer: customer
        });
      } else {
        res.json({ success: false, message: 'Tài khoản chưa được xác thực' });
      }
    } else {
      res.json({ success: false, message: 'Sai tài khoản hoặc mật khẩu' });
    }
  } else {
    res.json({ success: false, message: 'Vui lòng nhập tài khoản và mật khẩu' });
  }
});

// --- CHECK TOKEN ---
router.get('/token', JwtUtil.checkToken, function (req, res) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  res.json({
    success: true,
    message: 'Token is valid',
    token: token
  });
});

// --- MY PROFILE ---
router.put('/customers/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;

  const customer = {
    _id: _id,
    username: username,
    password: password,
    name: name,
    phone: phone,
    email: email
  };

  const result = await CustomerDAO.update(customer);
  res.json(result);
});

// --- CHECKOUT ---
router.post('/checkout', JwtUtil.checkToken, async function (req, res) {
  const now = new Date().getTime();
  const total = req.body.total;
  const items = req.body.items;
  const customer = req.body.customer;

  const order = {
    cdate: now,
    total: total,
    status: 'PENDING',
    customer: customer,
    items: items
  };

  const result = await OrderDAO.insert(order);
  res.json(result);
});

// --- MY ORDERS ---
router.get('/orders/customer/:cid', JwtUtil.checkToken, async function (req, res) {
  const _cid = req.params.cid;
  const orders = await OrderDAO.selectByCustID(_cid);
  res.json(orders);
});

module.exports = router;