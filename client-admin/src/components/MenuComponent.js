import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link, NavLink } from 'react-router-dom';
import './Menu.css';

class Menu extends Component {
  static contextType = MyContext;

  render() {
    return (
      <div className="admin-menu-wrapper">
        <div className="admin-brand">
          
          <div className="admin-brand-logo">LAPTOP<span style={{color: "#ffc107"}}>PRO</span></div><div className="admin-brand-text">Bảng Điều Khiển Admin</div>
        </div>

        <ul className="admin-menu-list">
          <li>
            <NavLink to="/admin/home" className="admin-menu-link">
              Trang Chủ
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/category" className="admin-menu-link">
              Danh Mục
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/product" className="admin-menu-link">
              Sản Phẩm
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/order" className="admin-menu-link">
              Đơn Hàng
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/customer" className="admin-menu-link">
              Khách Hàng
            </NavLink>
          </li>
        </ul>

        <div className="admin-user-box">
          <div className="admin-user-info">
            <span className="admin-user-label">Xin chào</span>
            <strong>{this.context.username}</strong>
          </div>

          <Link
            to="/admin/home"
            className="admin-logout-btn"
            onClick={() => this.lnkLogoutClick()}
          >
            Đăng Xuất
          </Link>
        </div>
      </div>
    );
  }

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }
}

export default Menu;