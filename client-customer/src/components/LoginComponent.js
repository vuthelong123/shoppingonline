import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import './Login.css';

class Login extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }

  render() {
    return (
      
      <div className="customer-content">
        <div className="form-container">
          <div className="modern-form-card">
            <h2>ĐĂNG NHẬP</h2>
            <p className="form-subtitle">Đăng nhập tài khoản để mua sắm ngay</p>
            <form className="modern-form">
              <div className="input-group">
                <label>Tên đăng nhập</label>
                <input
                  className="input-modern"
                  type="text"
                  value={this.state.txtUsername}
                  onChange={(e) =>
                    this.setState({ txtUsername: e.target.value })
                  }
                />
              </div>

              <div className="input-group">
                <label>Mật khẩu</label>
                <input
                  className="input-modern"
                  type="password"
                  value={this.state.txtPassword}
                  onChange={(e) =>
                    this.setState({ txtPassword: e.target.value })
                  }
                />
              </div>

              <button
                className="btn-primary btn-full"
                type="submit"
                onClick={(e) => this.btnLoginClick(e)}
              >
                ĐĂNG NHẬP
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // event handler
  btnLoginClick(e) {
    e.preventDefault();

    const username = this.state.txtUsername;
    const password = this.state.txtPassword;

    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }

  // API
  apiLogin(account) {
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;

      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}

export default withRouter(Login);