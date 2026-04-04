import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="customer-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SHOPBANLAPTOP - BÁN HÀNG ĐỈNH CAO</h3>
            <p>Cam kết laptop chính hãng, chuẩn gaming và văn phòng cao cấp với chế độ bảo hành tuyệt đối. Chuyên nghiệp, tận tâm và tốc độ.</p>
          </div>
          <div className="footer-section">
            <h3>THÔNG TIN LIÊN HỆ</h3>
            <p>📍 Địa chỉ: Toà nhà Innovation, Khu Công Nghệ Cao, TP.HCM</p>
            <p>📞 Điện thoại: 099.999.9999</p>
            <p>✉ Email: support@shopbanlaptop.vn</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Shopbanlaptop. Design by Antigravity.</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
