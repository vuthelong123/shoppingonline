import React, { Component } from 'react';
import MyContext from './MyContext';

class MyProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // global variables
      token: '',
      customer: null,
      mycart: [],

      // functions
      setToken: this.setToken,
      setCustomer: this.setCustomer,
      setMycart: this.setMycart
    };
  }

  // set token
  setToken = (value) => {
    this.setState({ token: value });
  };

  // set customer
  setCustomer = (value) => {
    this.setState({ customer: value });
  };

  // set cart
  setMycart = (value) => {
    this.setState({ mycart: value });
  };

  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;