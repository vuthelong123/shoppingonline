import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './Order.css';

class Order extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  render() {
    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total.toLocaleString('vi-VN')} ₫</td>
          <td>
            {item.status === 'PENDING' ? (
              <span className="status-pending">{item.status}</span>
            ) : item.status === 'APPROVED' ? (
              <span className="status-approved">{item.status}</span>
            ) : (
              <span className="status-cancelled">{item.status}</span>
            )}
          </td>
          <td>
            {item.status === 'PENDING' ? (
              <div className="order-actions">
                <span
                  className="order-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.lnkApproveClick(item._id);
                  }}
                >
                  APPROVE
                </span>
                <span
                  className="order-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.lnkCancelClick(item._id);
                  }}
                >
                  CANCEL
                </span>
              </div>
            ) : (
              <div />
            )}
          </td>
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
        <div className="order-section">
          <h2 className="order-title">ORDER LIST</h2>
          <div className="modern-table-wrapper"><table className="modern-table">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Creation date</th>
                <th>Cust. name</th>
                <th>Cust. phone</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              {orders}
            </tbody>
          </table></div>
        </div>

        {this.state.order ? (
          <div className="order-section">
            <h2 className="order-title">ORDER DETAIL</h2>
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
    this.apiGetOrders();
  }

  // event handlers
  trItemClick(item) {
    this.setState({ order: item });
  }

  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }

  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELLED');
  }

  // apis
  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }

  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/orders/status/' + id, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('Thất bại');
      }
    });
  }
}

export default Order;