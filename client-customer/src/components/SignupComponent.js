import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: '',
      success: false
    };
  }

  render() {
    if (this.state.success) {
      return <Navigate to="/verify" state={{ email: this.state.txtEmail }} />;
    }
    return (
      
      <div className="customer-content">
        <div className="form-container">
          <div className="modern-form-card">
            <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
            <p className="form-subtitle">Tạo tài khoản để nhận nhiều ưu đãi laptop</p>
            <form className="modern-form">
              <div className="input-group">
                <label>Tên đăng nhập</label>
                <input className="input-modern" type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} required />
              </div>
              <div className="input-group">
                <label>Mật khẩu</label>
                <input className="input-modern" type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} required />
              </div>
              <div className="input-group">
                <label>Họ và tên</label>
                <input className="input-modern" type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} required />
              </div>
              <div className="input-group">
                <label>Số điện thoại</label>
                <input className="input-modern" type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} required />
              </div>
              <div className="input-group">
                <label>Email xác thực</label>
                <input className="input-modern" type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} required />
              </div>
              <input type="submit" value="ĐĂNG KÝ" className="btn-primary btn-full" onClick={(e) => this.btnSignupClick(e)} />
            </form>
          </div>
        </div>
      </div>

    );
  }

  // event handler
  btnSignupClick(e) {
    e.preventDefault();

    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;

    if (!username || !password || !name || !phone || !email) {
      alert('Vui lòng nhập tài khoản, mật khẩu, họ tên, điện thoại và email');
      return;
    }

    if (password.length < 8) {
      alert('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('Số điện thoại phải có đúng 10 chữ số');
      return;
    }

    const account = {
      username: username,
      password: password,
      name: name,
      phone: phone,
      email: email
    };

    this.apiSignup(account);
  }

  // API call
  apiSignup(account) {
    axios.post('/api/customer/signup', account)
      .then((res) => {
        const result = res.data;
        alert(result.message);
        if (result.success) {
          this.setState({ success: true });
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Lỗi hệ thống');
      });
  }
}

export default Signup;