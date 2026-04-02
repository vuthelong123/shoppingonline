const express = require('express');
const router = express.Router();

// utils
const JwtUtil = require('../utils/JwtUtil');
const EmailUtil = require('../utils/EmailUtil'); // ✅ THÊM

// daos
const AdminDAO = require('../models/AdminDAO');
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');
const OrderDAO = require('../models/OrderDAO');
const CustomerDAO = require('../models/CustomerDAO');


// ================= LOGIN =================
router.post('/login', async function (req, res) {
  const { username, password } = req.body;

  if (username && password) {
    const admin = await AdminDAO.selectByUsernameAndPassword(username, password);

    if (admin) {
      const token = JwtUtil.genToken(username, password);
      res.json({ success: true, message: 'Authentication successful', token: token });
    } else {
      res.json({ success: false, message: 'Incorrect username or password' });
    }
  } else {
    res.json({ success: false, message: 'Please input username and password' });
  }
});

// check token
router.get('/token', JwtUtil.checkToken, function (req, res) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  res.json({ success: true, message: 'Token is valid', token: token });
});


// ================= CATEGORY =================
router.get('/categories', JwtUtil.checkToken, async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});

router.post('/categories', JwtUtil.checkToken, async function (req, res) {
  const result = await CategoryDAO.insert({ name: req.body.name });
  res.json(result);
});

router.put('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const category = { _id: req.params.id, name: req.body.name };
  const result = await CategoryDAO.update(category);
  res.json(result);
});

router.delete('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const result = await CategoryDAO.delete(req.params.id);
  res.json(result);
});


// ================= PRODUCT =================
router.get('/products', JwtUtil.checkToken, async function (req, res) {
  let products = await ProductDAO.selectAll();

  const sizePage = 4;
  const noPages = Math.ceil(products.length / sizePage);

  let curPage = 1;
  if (req.query.page) curPage = parseInt(req.query.page);

  const offset = (curPage - 1) * sizePage;
  products = products.slice(offset, offset + sizePage);

  res.json({ products, noPages, curPage });
});

router.post('/products', JwtUtil.checkToken, async function (req, res) {
  const category = await CategoryDAO.selectByID(req.body.category);

  const product = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description, // ✅ thêm mô tả
    cdate: new Date().getTime(),
    category: category
  };

  const result = await ProductDAO.insert(product);
  res.json(result);
});

router.put('/products/:id', JwtUtil.checkToken, async function (req, res) {
  const category = await CategoryDAO.selectByID(req.body.category);

  const product = {
    _id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description, // ✅ thêm mô tả
    cdate: new Date().getTime(),
    category: category
  };

  const result = await ProductDAO.update(product);
  res.json(result);
});

router.delete('/products/:id', JwtUtil.checkToken, async function (req, res) {
  const result = await ProductDAO.delete(req.params.id);
  res.json(result);
});


// ================= CUSTOMER =================

// lấy tất cả customer
router.get('/customers', JwtUtil.checkToken, async function (req, res) {
  const customers = await CustomerDAO.selectAll();
  res.json(customers);
});

// ✅ GỬI EMAIL ACTIVE
router.get('/customers/sendmail/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const cust = await CustomerDAO.selectByID(_id);

  if (cust) {
    const send = await EmailUtil.send(cust.email, cust._id, cust.token);

    if (send) {
      res.json({ success: true, message: 'Please check email' });
    } else {
      res.json({ success: false, message: 'Email failure' });
    }
  } else {
    res.json({ success: false, message: 'Not exists customer' });
  }
});

// ❗ DEACTIVE CUSTOMER
router.put('/customers/deactive/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const token = req.body.token;

  const result = await CustomerDAO.active(_id, token, 0);
  res.json(result);
});


// ================= ORDER =================

// lấy tất cả order
router.get('/orders', JwtUtil.checkToken, async function (req, res) {
  const orders = await OrderDAO.selectAll();
  res.json(orders);
});

// lấy order theo customer
router.get('/orders/customer/:cid', JwtUtil.checkToken, async function (req, res) {
  const orders = await OrderDAO.selectByCustID(req.params.cid);
  res.json(orders);
});

// update status
router.put('/orders/status/:id', JwtUtil.checkToken, async function (req, res) {
  const result = await OrderDAO.update(req.params.id, req.body.status);
  res.json(result);
});

module.exports = router;