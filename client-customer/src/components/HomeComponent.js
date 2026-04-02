import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }

  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="product-card">
          <Link to={'/product/' + item._id} className="product-link">
            <img
              className="product-image"
              src={'data:image/jpg;base64,' + item.image}
              alt={item.name}
            />
            <div className="product-info">
              <div className="product-name">{item.name}</div>
              <div className="product-price">Price: {item.price}</div>
            </div>
          </Link>
        </div>
      );
    });

    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="product-card">
          <Link to={'/product/' + item._id} className="product-link">
            <img
              className="product-image"
              src={'data:image/jpg;base64,' + item.image}
              alt={item.name}
            />
            <div className="product-info">
              <div className="product-name">{item.name}</div>
              <div className="product-price">Price: {item.price}</div>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <div className="home-container">
        <div className="home-section">
          <h2 className="home-title">NEW PRODUCTS</h2>
          <div className="product-grid">
            {newprods}
          </div>
        </div>

        {this.state.hotprods.length > 0 ? (
          <div className="home-section">
            <h2 className="home-title">HOT PRODUCTS</h2>
            <div className="product-grid">
              {hotprods}
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}

export default Home;