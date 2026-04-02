require('../utils/MongooseUtil');
const Models = require('./Models');

const CustomerDAO = {
  // kiểm tra username hoặc email đã tồn tại chưa
  async selectByUsernameOrEmail(username, email) {
    const query = { $or: [{ username: username }, { email: email }] };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  // thêm customer mới - tự active luôn
  async insert(customer) {
    const mongoose = require('mongoose');
    customer._id = new mongoose.Types.ObjectId();
    customer.active = 1;   // tự động kích hoạt
    customer.token = '';   // không cần token nữa
    const result = await Models.Customer.create(customer);
    return result;
  },

  // active account (giữ lại cũng được, nhưng gần như không cần nữa)
  async active(_id, token, active) {
    const query = { _id: _id, token: token };
    const newvalues = { active: active };
    const result = await Models.Customer.findOneAndUpdate(query, newvalues, { new: true });
    return result;
  },

  // login
  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  // update profile
  async update(customer) {
    const newvalues = {
      username: customer.username,
      password: customer.password,
      name: customer.name,
      phone: customer.phone,
      email: customer.email
    };

    const result = await Models.Customer.findByIdAndUpdate(
      customer._id,
      newvalues,
      { new: true }
    );

    return result;
  },

  // lấy tất cả customer
  async selectAll() {
    const customers = await Models.Customer.find({}).exec();
    return customers;
  },

  // lấy customer theo id
  async selectByID(_id) {
    const customer = await Models.Customer.findById(_id).exec();
    return customer;
  }
};

module.exports = CustomerDAO;