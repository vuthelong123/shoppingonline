import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './CategoryDetail.css';

class CategoryDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }

  render() {
    return (
      <div className="admin-form-col-box">
        <h2 className="admin-form-col-title">CATEGORY DETAIL</h2>
        <form className="admin-form-col-form">
          <table className="admin-form-col-table">
            <tbody>
              <tr>
                <td className="admin-form-col-label">ID</td>
                <td>
                  <input
                    className="admin-form-col-input"
                    type="text"
                    value={this.state.txtID}
                    onChange={(e) => {
                      this.setState({ txtID: e.target.value });
                    }}
                    readOnly={true}
                  />
                </td>
              </tr>
              <tr>
                <td className="admin-form-col-label">Name</td>
                <td>
                  <input
                    className="admin-form-col-input"
                    type="text"
                    value={this.state.txtName}
                    onChange={(e) => {
                      this.setState({ txtName: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <div className="admin-form-col-actions">
                    <input
                      className="admin-form-col-btn btn-add"
                      type="submit"
                      value="ADD NEW"
                      onClick={(e) => this.btnAddClick(e)}
                    />
                    <input
                      className="admin-form-col-btn btn-update"
                      type="submit"
                      value="UPDATE"
                      onClick={(e) => this.btnUpdateClick(e)}
                    />
                    <input
                      className="admin-form-col-btn btn-delete"
                      type="submit"
                      value="DELETE"
                      onClick={(e) => this.btnDeleteClick(e)}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item && this.props.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name
      });
    }
  }

  // event-handlers
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostCategory(cate);
    } else {
      alert('Please input name');
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutCategory(id, cate);
    } else {
      alert('Please input id and name');
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteCategory(id);
      } else {
        alert('Please input id');
      }
    }
  }

  // apis
  apiPostCategory(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/categories', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công');
        this.apiGetCategories();
        this.setState({ txtID: '', txtName: '' });
      } else {
        alert('Thất bại');
      }
    });
  }

  apiPutCategory(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/categories/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công');
        this.apiGetCategories();
      } else {
        alert('Thất bại');
      }
    });
  }

  apiDeleteCategory(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/categories/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thành công');
        this.apiGetCategories();
        this.setState({ txtID: '', txtName: '' });
      } else {
        alert('Thất bại');
      }
    });
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.props.updateCategories(result);
    });
  }
}

export default CategoryDetail;