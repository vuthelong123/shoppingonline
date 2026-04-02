import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
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
    if (this.context.token === '') {
      return (
        <div className="login-container">
          <div className="login-card">
            <h2 className="login-title">ADMIN LOGIN</h2>

            <form>
              <div className="login-group">
                <label className="login-label">Username</label>
                <input
                  className="login-input"
                  type="text"
                  value={this.state.txtUsername}
                  onChange={(e) =>
                    this.setState({ txtUsername: e.target.value })
                  }
                />
              </div>

              <div className="login-group">
                <label className="login-label">Password</label>
                <input
                  className="login-input"
                  type="password"
                  value={this.state.txtPassword}
                  onChange={(e) =>
                    this.setState({ txtPassword: e.target.value })
                  }
                />
              </div>

              <button
                className="login-btn"
                type="submit"
                onClick={(e) => this.btnLoginClick(e)}
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      );
    }

    return <div />;
  }

  // event-handlers
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

  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message);
      }
    });
  }
}

export default Login;