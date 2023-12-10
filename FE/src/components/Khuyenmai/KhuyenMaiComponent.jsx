import React, { Component } from "react";
import './KhuyenMai.css';
import '../../pages/css/reposive/khuyenmai.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class KhuyenMaiComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: [],
            
        }
    }

    componentDidMount() {
        if (this.state.productData.length === 0) {
            axios.get("http://localhost:8080/api/test/san-pham/khuyen-mai")
                .then(res => {
                    this.setState({ productData: res.data })
                })
                .catch(err => {
                    console.error("Looi khi load san pham ", err)
                })
        }
    }

    render() {
        const { productData } = this.state;
        const { hinhAnh } = this.props;
        const dataToRender = productData.length > 5 ? productData.slice(productData.length - 5) : productData;
        return (
            <div className="products-promotion">
                <h4 className="products-promotion__lable">
                    Sản phẩm đang giảm giá hot
                    <FontAwesomeIcon className="products-promotion__lable-icon" icon={faBolt} />
                    <a href="/khuyen-mai" className="products-promotion__lable-link">Xem tất cả</a>
                </h4>
                <div className="products-promotion__list_row">
                    {dataToRender.map(product => (
                        <div key={product.sp_id} className="products-promotion__item-col">
                            <Link to={`/san-pham/${product.sp_id}`} className="products-promotion__item-content">
                                {hinhAnh === null ? (
                                    <div className="products-promotion__item-img" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/iconLaptopDefault.jpg'})` }}></div>
                                ) : (
                                    <div className="products-promotion__item-img" style={{ backgroundImage: `url(data:image/jpg;base64,${hinhAnh[product.sp_id]})` }}></div>
                                )}
                                <div className="products-promotion__item-info">
                                    <h5 className="products-promotion__item-name">{product.sp_ten}</h5>
                                    <div className="products-promotion__item-brief">
                                        <table className="promotion__item-brief__table">
                                            <tbody>
                                                <tr>
                                                    <td>CPU</td>
                                                    <td>{product.sp_cpu}</td>
                                                </tr>
                                                <tr>
                                                    <td>RAM</td>
                                                    <td>{product.sp_ram}GB DDR4</td>
                                                </tr>
                                                <tr>
                                                    <td>Ổ cứng</td>
                                                    <td>{product.sp_ocung}</td>
                                                </tr>
                                                <tr>
                                                    <td>Card</td>
                                                    <td>{product.sp_card}</td>
                                                </tr>
                                                <tr>
                                                    <td>M.Hình</td>
                                                    <td>{product.sp_manhinh}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="products-promotion__item-price">
                                        <div className="products-promotion__item-price-top">
                                            <p className="old-price">{product.sp_gia.toLocaleString()}đ</p>
                                            <p className="price-saleoff">-{product.khuyenMai.gg_mucgiamgia}%</p>
                                        </div>
                                        <div className="products-promotion__item-price-bottom">
                                            <p className="new-price">{(product.sp_gia * (100 - product.khuyenMai.gg_mucgiamgia) / 100).toLocaleString()} đ</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const layHinhAnhTuStore = (state) => ({
    hinhAnh: state.hinhAnh,
});

export default connect(layHinhAnhTuStore)(KhuyenMaiComponent);