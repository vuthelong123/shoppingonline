import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './ProductDetail.css';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      txtDescription: '',
      cmbCategory: '',
      imgProduct: ''
    };
  }

  render() {
    const cates = this.state.categories.map((cate) => {
      return (
        <option key={cate._id} value={cate._id}>
          {cate.name}
        </option>
      );
    });

    return (
      <div className="admin-form-col-box">
        <h2 className="admin-form-col-title">PRODUCT DETAIL</h2>
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
                <td className="admin-form-col-label">Price</td>
                <td>
                  <input
                    className="admin-form-col-input"
                    type="text"
                    value={this.state.txtPrice}
                    onChange={(e) => {
                      this.setState({ txtPrice: e.target.value });
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td className="admin-form-col-label">Description</td>
                <td>
                  <textarea
                    className="admin-form-col-textarea"
                    value={this.state.txtDescription}
                    onChange={(e) => {
                      this.setState({ txtDescription: e.target.value });
                    }}
                    rows="5"
                    placeholder="Enter product description"
                  />
                </td>
              </tr>

              <tr>
                <td className="admin-form-col-label">Image</td>
                <td>
                  <input
                    className="admin-form-col-file"
                    type="file"
                    name="fileImage"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={(e) => this.previewImage(e)}
                  />
                </td>
              </tr>

              <tr>
                <td className="admin-form-col-label">Category</td>
                <td>
                  <select
                    className="admin-form-col-select"
                    value={this.state.cmbCategory}
                    onChange={(e) => {
                      this.setState({ cmbCategory: e.target.value });
                    }}
                  >
                    <option value="">--select--</option>
                    {cates}
                  </select>
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

              <tr>
                <td colSpan="2" className="product-preview-cell">
                  <img
                    className="product-preview-image"
                    src={this.state.imgProduct}
                    alt=""
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item && this.props.item) {
      this.setState({
        txtID: this.props.item._id,
        txtName: this.props.item.name,
        txtPrice: this.props.item.price,
        txtDescription: this.props.item.description || '',
        cmbCategory: this.props.item.category._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item.image
      });
    }
  }

  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice.toString().replace(/[.,\s]/g, ''));
    const description = this.state.txtDescription;
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');

    if (name && price && category && image) {
      const prod = {
        name: name,
        price: price,
        description: description,
        category: category,
        image: image
      };
      this.apiPostProduct(prod);
    } else {
      alert('Please input name, price, category and image');
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    const price = parseInt(this.state.txtPrice.toString().replace(/[.,\s]/g, ''));
    const description = this.state.txtDescription;
    const category = this.state.cmbCategory;
    const image = this.state.imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');

    if (id && name && price && category && image) {
      const prod = {
        name: name,
        price: price,
        description: description,
        category: category,
        image: image
      };
      this.apiPutProduct(id, prod);
    } else {
      alert('Please select an item and fill all fields');
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Please select an item to delete');
      }
    }
  }

  // APIs
  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      if (res.data) {
        alert('Thành công');
        this.apiGetProducts();
      } else {
        alert('Thất bại');
      }
    });
  }

  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      if (res.data) {
        alert('Thành công');
        this.apiGetProducts();
      } else {
        alert('Thất bại');
      }
    });
  }

  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios
      .delete('/api/admin/products/' + id, config)
      .then((res) => {
        if (res.data) {
          alert('Thành công');
          this.apiGetProducts();
        } else {
          alert('Thất bại');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Lỗi hệ thống khi xóa!');
      });
  }

  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages, result.curPage);
      } else if (this.props.curPage > 1) {
        axios
          .get('/api/admin/products?page=' + (this.props.curPage - 1), config)
          .then((res) => {
            this.props.updateProducts(res.data.products, res.data.noPages, res.data.curPage);
          });
      } else {
        this.props.updateProducts([], 0, 1);
      }
    });
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      this.setState({ categories: res.data });
    });
  }
}

export default ProductDetail;