import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './Customer.css';

class Customer extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      orders: [],
      order: null
    };
  }

  render() {
    const customers = this.state.customers.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trCustomerClick(item)}>
          <td>{item._id}</td>
          <td>{item.username}</td>
          <td>{item.password}</td>
          <td>{item.name}</td>
          <td>{item.phone}</td>
          <td>{item.email}</td>
          <td>
            {item.active === 0 ? (
              <span className="status-inactive">Inactive</span>
            ) : (
              <span className="status-active">Active</span>
            )}
          </td>
          <td>
            {item.active === 0 ? (
              <span
                className="customer-link"
                onClick={(e) => {
                  e.stopPropagation();
                  this.lnkEmailClick(item);
                }}
              >
                EMAIL
              </span>
            ) : (
              <span
                className="customer-link"
                onClick={(e) => {
                  e.stopPropagation();
                  this.lnkDeactiveClick(item);
                }}
              >
                DEACTIVE
              </span>
            )}
          </td>
        </tr>
      );
    });

    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trOrderClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total.toLocaleString('vi-VN')} ₫</td>
          <td>{item.status}</td>
        </tr>
      );
    });

    let items = null;
    if (this.state.order) {
      items = this.state.order.items.map((item, index) => {
        return (
          <tr key={item.product._id}>
            <td>{index + 1}</td>
            <td>{item.product._id}</td>
            <td>{item.product.name}</td>
            <td>
              <img
                className="product-image"
                src={'data:image/jpg;base64,' + item.product.image}
                alt=""
              />
            </td>
            <td>{item.product.price.toLocaleString('vi-VN')} ₫</td>
            <td>{item.quantity}</td>
            <td>{(item.product.price * item.quantity).toLocaleString('vi-VN')} ₫</td>
          </tr>
        );
      });
    }

    return (
      <div className="admin-stacked-layout">
        <div className="customer-section">
          <h2 className="customer-title">CUSTOMER LIST</h2>
          <div className="modern-table-wrapper"><table className="modern-table">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Password</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
              {customers}
            </tbody>
          </table></div>
        </div>

        {this.state.orders.length > 0 ? (
          <div className="customer-section">
            <h2 className="customer-title">ORDER LIST</h2>
            <div className="modern-table-wrapper"><table className="modern-table">
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Creation date</th>
                  <th>Cust. name</th>
                  <th>Cust. phone</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
                {orders}
              </tbody>
            </table></div>
          </div>
        ) : (
          <div />
        )}

        {this.state.order ? (
          <div className="customer-section">
            <h2 className="customer-title">ORDER DETAIL</h2>
            <div className="modern-table-wrapper"><table className="modern-table">
              <tbody>
                <tr>
                  <th>No.</th>
                  <th>Prod. ID</th>
                  <th>Prod. name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
                {items}
              </tbody>
            </table></div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCustomers();
  }

  // ================= EVENT =================
  trCustomerClick(item) {
    this.setState({ orders: [], order: null });
    this.apiGetOrdersByCustID(item._id);
  }

  trOrderClick(item) {
    this.setState({ order: item });
  }

  lnkDeactiveClick(item) {
    this.apiPutCustomerDeactive(item._id, item.token);
  }

  lnkEmailClick(item) {
    this.apiGetCustomerSendmail(item._id);
  }

  // ================= API =================
  apiGetCustomers() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/customers', config).then((res) => {
      this.setState({ customers: res.data });
    });
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
      this.setState({ orders: res.data });
    });
  }

  apiPutCustomerDeactive(id, token) {
    const body = { token: token };
    const config = { headers: { 'x-access-token': this.context.token } };

    axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
      if (res.data) {
        this.apiGetCustomers();
      } else {
        alert('Thất bại');
      }
    });
  }

  apiGetCustomerSendmail(id) {
    const config = { headers: { 'x-access-token': this.context.token } };

    axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
      const result = res.data;
      alert(result.message);
    });
  }
}

export default Customer;