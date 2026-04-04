import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Category from './CategoryComponent';
import Product from './ProductComponent';
import Order from './OrderComponent';
import Customer from './CustomerComponent';
import Footer from './FooterComponent';

import { Routes, Route, Navigate } from 'react-router-dom';
import './Main.css';

class Main extends Component {
  static contextType = MyContext;

  render() {
    if (this.context.token !== '') {
      return (
        <div className="body-admin">
          
          {/* Sidebar */}
          <div className="admin-sidebar">
            {/* <div className="admin-logo">ADMIN PANEL</div> */}
            <Menu />
          </div>

          {/* Content */}
          <div className="admin-content">
            <div className="admin-page-wrapper" style={{ flex: 1 }}>
              <Routes>
                <Route path='/admin' element={<Navigate replace to='/admin/home' />} />
                <Route path='/admin/home' element={<Home />} />
                <Route path='/admin/category' element={<Category />} />
                <Route path='/admin/product' element={<Product />} />
                <Route path='/admin/order' element={<Order />} />
                <Route path='/admin/customer' element={<Customer />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      );
    }
    return <div />;
  }
}

export default Main;