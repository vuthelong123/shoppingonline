
import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="admin-dashboard">
        <h2 className="dashboard-title">Tổng quan Hệ thống</h2>
        <div className="dashboard-grid">
          <div className="dashboard-stat-card">
            <div className="stat-value">Quản lý Đơn Hàng</div>
            <div className="stat-desc">Duyệt & Giao hàng ngay lập tức</div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-value">Quản trị Khách Hàng</div>
            <div className="stat-desc">Bảo mật thông tin hệ thống</div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-value">Dashboard Chuyên Nghiệp</div>
            <div className="stat-desc">Thiết kế hoàn toàn mới</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
