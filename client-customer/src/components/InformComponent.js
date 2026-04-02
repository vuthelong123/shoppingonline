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
              <Link className="inform-link" to="/login">Login</Link>
              <span className="inform-separator">|</span>
              <Link className="inform-link" to="/signup">Sign-up</Link>
            </div>
          ) : (
            <div className="inform-left">
              <span>
                Hello <b className="inform-user-name">{this.context.customer.name}</b>
              </span>
              <span className="inform-separator">|</span>
              <Link
                className="inform-link"
                to="/home"
                onClick={() => this.lnkLogoutClick()}
              >
                Logout
              </Link>
              <span className="inform-separator">|</span>
              <Link className="inform-link" to="/myprofile">My profile</Link>
              <span className="inform-separator">|</span>
              <Link className="inform-link" to="/myorders">My orders</Link>
            </div>
          )}
        </div>

        <div className="inform-right">
          <Link className="inform-link" to="/mycart">My cart</Link>
          <span>
            have <b className="inform-cart-count">{this.context.mycart.length}</b> items
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