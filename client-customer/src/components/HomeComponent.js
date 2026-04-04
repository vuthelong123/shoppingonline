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
        <div key={item._id} className="modern-product-card">
          <Link to={'/product/' + item._id} className="modern-product-link">
            <div className="product-image-container">
              <span className="product-badge badge-new">Mới</span>
              <img
                className="modern-product-image"
                src={'data:image/jpg;base64,' + item.image}
                alt={item.name}
              />
            </div>
            <div className="modern-product-info">
              <h3 className="modern-product-name">{item.name}</h3>
              <div className="modern-product-price">{item.price.toLocaleString('vi-VN')} ₫</div>
            </div>
          </Link>
        </div>
      );
    });

    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="modern-product-card">
          <Link to={'/product/' + item._id} className="modern-product-link">
            <div className="product-image-container">
              <span className="product-badge badge-hot">Hot</span>
              <img
                className="modern-product-image"
                src={'data:image/jpg;base64,' + item.image}
                alt={item.name}
              />
            </div>
            <div className="modern-product-info">
              <h3 className="modern-product-name">{item.name}</h3>
              <div className="modern-product-price">{item.price.toLocaleString('vi-VN')} ₫</div>
            </div>
          </Link>
        </div>
      );
    });

    return (
      <div className="home-container">
        
        {/* Modern Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Đột Phá Hiệu Năng.<br/>Dẫn Đầu Xu Hướng.</h1>
            <p className="hero-subtitle">Khám phá thế hệ Laptop siêu mỏng nhẹ, tối ưu cho đồ hoạ và gaming. Khuyến mãi lên đến 30%.</p>
            <button className="btn-primary" onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}>Khám phá ngay</button>
          </div>
        </div>

        <div className="home-content-wrapper">
          <div className="home-section">
            <div className="section-header">
              <h2>Sản Phẩm Mới Ra Mắt</h2>
            </div>
            <div className="modern-product-grid">
              {newprods}
            </div>
          </div>

          {this.state.hotprods.length > 0 && (
            <div className="home-section">
              <div className="section-header">
                <h2>Sản Phẩm Bán Chạy</h2>
              </div>
              <div className="modern-product-grid">
                {hotprods}
              </div>
            </div>
          )}
        </div>
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
      this.setState({ newprods: res.data });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      this.setState({ hotprods: res.data });
    });
  }
}

export default Home;