import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import './Myorders.css';

class Myorders extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  render() {
    if (this.context.token === '') return <Navigate replace to="/login" />;

    const orders = this.state.orders.map((item) => {
      return (
        <tr key={item._id} onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.customer.name}</td>
          <td>{item.customer.phone}</td>
          <td>{item.total.toLocaleString('vi-VN')} ₫</td>
          <td>
            <span className="myorders-status">{item.status === 'PENDING' ? 'CHỜ DUYỆT' : item.status === 'APPROVED' ? 'ĐÃ DUYỆT' : 'ĐÃ HỦY'}</span>
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
                className="myorders-image"
                src={'data:image/jpg;base64,' + item.product.image}
                alt={item.product.name}
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
      <div className="myorders-container">
        <div className="myorders-section">
          <h2 className="myorders-title">DANH SÁCH ĐƠN HÀNG</h2>
          <div className="modern-table-wrapper"><table className="modern-table">
            <tbody>
              <tr>
                <th>Mã</th>
                <th>Ngày tạo</th>
                <th>Tên khách hàng</th>
                <th>SĐT</th>
                <th>Tổng cộng</th>
                <th>Trạng thái</th>
              </tr>
              {orders}
            </tbody>
          </table></div>
        </div>

        {this.state.order ? (
          <div className="myorders-section">
            <h2 className="myorders-title">CHI TIẾT ĐƠN HÀNG</h2>
            <div className="modern-table-wrapper"><table className="modern-table">
              <tbody>
                <tr>
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
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  // event handlers
  trItemClick(item) {
    this.setState({ order: item });
  }

  // apis
  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/customer/orders/customer/' + cid, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}

export default Myorders;