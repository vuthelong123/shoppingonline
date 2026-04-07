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
                  DUYỆT
                </span>
                <span
                  className="order-link"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.lnkCancelClick(item._id);
                  }}
                >
                  HỦY
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
          <h2 className="order-title">DANH SÁCH ĐƠN HÀNG</h2>
          <div className="modern-table-wrapper"><table className="modern-table">
            <tbody>
                <th>Mã</th>
                <th>Ngày tạo</th>
                <th>Tên khách hàng</th>
                <th>SĐT</th>
                <th>Tổng cộng</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
              {orders}
            </tbody>
          </table></div>
        </div>

        {this.state.order ? (
          <div className="order-section">
            <h2 className="order-title">CHI TIẾT ĐƠN HÀNG</h2>
            <div className="modern-table-wrapper"><table className="modern-table">
              <tbody>
                  <th>STT</th>
                  <th>Mã SP</th>
                  <th>Tên SP</th>
                  <th>Hình ảnh</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
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