import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import './Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="customer-menu-item">
          <Link className="customer-menu-link" to={'/product/category/' + item._id}>
            {item.name}
          </Link>
        </li>
      );
    });

    return (
      <div className="customer-menu-bar">
        <div className="customer-menu-left">
          <Link to="/home" className="customer-brand-logo">LAPTOP<span style={{color: "#ffc107"}}>PRO</span></Link>
          <ul className="customer-menu-list">
            
            {cates}
          </ul>
        </div>

        <div className="customer-menu-right">
          <form className="customer-search-form">
            <input
              type="search"
              placeholder="Tìm kiếm..."
              className="customer-search-input"
              value={this.state.txtKeyword}
              onChange={(e) => {
                this.setState({ txtKeyword: e.target.value });
              }}
            />
            <input
              type="submit"
              value="TÌM KIẾM"
              className="customer-search-btn"
              onClick={(e) => this.btnSearchClick(e)}
            />
          </form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default withRouter(Menu);