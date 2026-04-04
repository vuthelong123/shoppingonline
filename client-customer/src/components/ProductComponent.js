
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import './Product.css';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="modern-product-card">
          <Link to={'/product/' + item._id} className="modern-product-link">
            <div className="product-image-container">
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
      <div className="customer-content">
        <div className="customer-card">
          <div className="section-header">
            <h2>DANH SÁCH SẢN PHẨM</h2>
            <span className="product-count">{this.state.products.length} sản phẩm tương ứng</span>
          </div>
          <div className="modern-product-grid" style={{marginTop: '24px'}}>
            {prods.length > 0 ? prods : <p className="no-products-msg">Không tìm thấy sản phẩm nào.</p>}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      this.setState({ products: res.data });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      this.setState({ products: res.data });
    });
  }
}

export default withRouter(Product);
