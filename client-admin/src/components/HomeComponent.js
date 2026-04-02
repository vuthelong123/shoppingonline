import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="home-card">
          <h2 className="home-title">ADMIN HOME</h2>
          <div className="home-image-wrapper">
            <img
              className="home-image"
              src="https://pendecor.vn/uploads/files/2024/09/21/phong-cach-thiet-ke-shop-dien-thoai-16.jpg"
              alt="Admin Home"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;