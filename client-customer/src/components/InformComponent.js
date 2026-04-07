import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import './Inform.css';

class Inform extends Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="inform-bar">
        <div className="inform-left">
          {this.context.token === '' ? (
            <div className="inform-left">
              <Link className="inform-link" to="/login">Đăng Nhập</Link>
              <span className="inform-separator">|</span>
              <Link className="inform-link" to="/signup">Đăng Ký</Link>
            </div>
          ) : (
            <div className="inform-left">
              <span>
                Xin chào <b className="inform-user-name">{this.context.customer.name}</b>
              </span>
              <span className="inform-separator">|</span>
              <Link
                className="inform-link"
                to="/home"
                onClick={() => this.lnkLogoutClick()}
              >
                Đăng Xuất
              </Link>
              <span className="inform-separator">|</span>
              <Link className="inform-link" to="/myprofile">Hồ sơ của tôi</Link>
              <span className="inform-separator">|</span>
              <Link className="inform-link" to="/myorders">Đơn hàng của tôi</Link>
            </div>
          )}
        </div>

        <div className="inform-right">
            <Link className="inform-link" to="/mycart">Giỏ Hàng</Link>
          <span>
            có <b className="inform-cart-count">{this.context.mycart.length}</b> sản phẩm
          </span>
        </div>
      </div>
    );
  }

  // event handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;