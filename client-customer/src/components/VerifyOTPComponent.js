import axios from 'axios';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import './VerifyOTP.css';
import withRouter from '../utils/withRouter';

class VerifyOTP extends Component {
  constructor(props) {
    super(props);
    const emailProp = this.props.location?.state?.email || '';
    this.state = {
      txtEmail: emailProp,
      txtOTP: '',
      success: false
    };
  }

  render() {
    if (this.state.success) {
      return <Navigate to="/login" />;
    }
    return (
      
      <div className="customer-content">
        <div className="form-container">
          <div className="modern-form-card">
            <h2>XÁC THỰC EMAIL</h2>
            <p className="form-subtitle">Nhập mã OTP gồm 6 chữ số đã được gửi đến hộp thư của bạn.</p>
            <form className="modern-form">
              <div className="input-group">
                <label>Email của bạn</label>
                <input className="input-modern" type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} required disabled={!!this.props.location?.state?.email} />
              </div>
              <div className="input-group">
                <label>Mã OTP</label>
                <input className="input-modern" type="text" value={this.state.txtOTP} onChange={(e) => { this.setState({ txtOTP: e.target.value }) }} maxLength="6" required />
              </div>
              <input type="submit" value="KÍCH HOẠT TÀI KHOẢN" className="btn-primary btn-full" onClick={(e) => this.btnVerifyClick(e)} />
            </form>
          </div>
        </div>
      </div>

    );
  }

  btnVerifyClick(e) {
    e.preventDefault();
    const email = this.state.txtEmail;
    const otp = this.state.txtOTP;
    if (email && otp) {
      this.apiVerifyOTP(email, otp);
    } else {
      alert('Vui lòng nhập đầy đủ Email và OTP');
    }
  }

  // apis
  apiVerifyOTP(email, otp) {
    const body = { email: email, otp: otp };
    axios.post('/api/customer/verify-otp', body).then((res) => {
      const result = res.data;
      if (result.success) {
        alert('Xác thực thành công!');
        this.setState({ success: true });
      } else {
        alert(result.message);
      }
    });
  }
}
export default withRouter(VerifyOTP);
