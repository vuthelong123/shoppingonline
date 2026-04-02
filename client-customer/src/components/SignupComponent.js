import axios from 'axios';
import React, { Component } from 'react';
import './Signup.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }

  render() {
    return (
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">SIGN-UP</h2>

          <form className="signup-form">
            <div className="signup-group">
              <label className="signup-label">Username</label>
              <input
                className="signup-input"
                type="text"
                value={this.state.txtUsername}
                onChange={(e) =>
                  this.setState({ txtUsername: e.target.value })
                }
              />
            </div>

            <div className="signup-group">
              <label className="signup-label">Password</label>
              <input
                className="signup-input"
                type="password"
                value={this.state.txtPassword}
                onChange={(e) =>
                  this.setState({ txtPassword: e.target.value })
                }
              />
            </div>

            <div className="signup-group">
              <label className="signup-label">Name</label>
              <input
                className="signup-input"
                type="text"
                value={this.state.txtName}
                onChange={(e) =>
                  this.setState({ txtName: e.target.value })
                }
              />
            </div>

            <div className="signup-group">
              <label className="signup-label">Phone</label>
              <input
                className="signup-input"
                type="tel"
                value={this.state.txtPhone}
                onChange={(e) =>
                  this.setState({ txtPhone: e.target.value })
                }
              />
            </div>

            <div className="signup-group">
              <label className="signup-label">Email</label>
              <input
                className="signup-input"
                type="email"
                value={this.state.txtEmail}
                onChange={(e) =>
                  this.setState({ txtEmail: e.target.value })
                }
              />
            </div>

            <button
              className="signup-btn"
              type="submit"
              onClick={(e) => this.btnSignupClick(e)}
            >
              SIGN-UP
            </button>
          </form>
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
      alert('Please input username, password, name, phone and email');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert('Phone must be exactly 10 digits');
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
      })
      .catch((error) => {
        console.error(error);
        alert('API error');
      });
  }
}

export default Signup;