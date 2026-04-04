import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
import './Category.css';

class Category extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }

  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <tr
          key={item._id}
          className={this.state.itemSelected === item ? 'active' : ''}
          onClick={() => this.trItemClick(item)}
        >
          <td>{item._id}</td>
          <td>{item.name}</td>
        </tr>
      );
    });

    return (
      <div className="admin-split-layout">
        <div className="admin-list-col">
          <h2 className="form-title">CATEGORY LIST</h2>
          <div className="modern-table-wrapper"><table className="modern-table">
            <tbody>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
              {cates}
            </tbody>
          </table></div>
        </div>

        <div className="admin-form-col">
          <CategoryDetail
            item={this.state.itemSelected}
            updateCategories={this.updateCategories}
          />
        </div>

        <div className="float-clear" />
      </div>
    );
  }

  // update list
  updateCategories = (categories) => {
    this.setState({ categories: categories });
  };

  componentDidMount() {
    this.apiGetCategories();
  }

  // click row
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  // call API
  apiGetCategories() {
    const config = {
      headers: { 'x-access-token': this.context.token }
    };

    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default Category;