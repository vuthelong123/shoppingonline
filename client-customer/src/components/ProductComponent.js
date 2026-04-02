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
        <div key={item._id} className="product-page-item">
          <Link to={'/product/' + item._id} className="product-page-link">
            <figure className="product-page-figure">
              <img
                className="product-page-image"
                src={'data:image/jpg;base64,' + item.image}
                alt={item.name}
              />
              <figcaption className="product-page-caption">
                <div className="product-page-name">{item.name}</div>
                <div className="product-page-price">Price: {item.price}</div>
              </figcaption>
            </figure>
          </Link>
        </div>
      );
    });

    return (
      <div className="product-page-container">
        <div className="product-page-card">
          <h2 className="product-page-title">LIST PRODUCTS</h2>
          <div className="product-page-grid">
            {prods}
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

  // apis
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}

export default withRouter(Product);