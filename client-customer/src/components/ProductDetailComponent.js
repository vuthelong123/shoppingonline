
import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import './ProductDetail.css';

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div className="customer-content">
          <div className="customer-card detail-card">
            <div className="detail-split-layout">
              {/* Left Column: Image Gallery */}
              <div className="detail-image-col">
                <div className="detail-main-image-wrapper">
                  <img
                    src={'data:image/jpg;base64,' + prod.image}
                    alt={prod.name}
                    className="detail-main-image"
                  />
                </div>
              </div>

              {/* Right Column: Info & Action */}
              <div className="detail-info-col">
                <span className="detail-category-badge">{prod.category ? prod.category.name : 'Laptop'}</span>
                <h1 className="detail-title">{prod.name}</h1>
                <div className="detail-price-box">
                  <span className="price-label">Giá bán:</span>
                  <span className="price-value">{prod.price.toLocaleString('vi-VN')} ₫</span>
                </div>
                
                <div className="detail-specs">
                  <h3>Thông số cơ bản</h3>
                  <ul>
                    <li>15.6" FHD (1920 x 1080) 144Hz IPS</li>
                    <li>Intel Core i7 Processor</li>
                    <li>16GB RAM DDR5</li>
                    <li>512GB SSD NVMe</li>
                  </ul>
                </div>

                <div className="detail-actions">
                  <div className="qty-selector">
                    <label>Số lượng:</label>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={this.state.txtQuantity}
                      onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }}
                      className="qty-input"
                    />
                  </div>
                  <button className="btn-primary detail-add-btn" onClick={(e) => this.btnAdd2CartClick(e)}>
                    Thêm vào giỏ hàng
                  </button>
                </div>
                
                <div className="detail-assurance">
                  <div className="assurance-item">☑ Cam kết chính hãng 100%</div>
                  <div className="assurance-item">☑ Khách hàng yên tâm mua sắm</div>
                  <div className="assurance-item">☑ Hỗ trợ kỹ thuật trọn đời</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      this.setState({ product: res.data });
    });
  }

  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id);
      if (index === -1) {
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      alert('Thêm vào giỏ thành công');
    } else {
      alert('Vui lòng nhập số lượng hợp lệ');
    }
  }
}

export default withRouter(ProductDetail);
