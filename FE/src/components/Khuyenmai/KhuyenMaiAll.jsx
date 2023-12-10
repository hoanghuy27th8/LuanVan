import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import '../../pages/css/reposive/khuyenmai.css'
import './KhuyenMai.css';
import axios from "axios";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class KhuyenMaiAll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sanPhams: [],
            productOnPage: 10,
            currentPage: 1
        }
    }
    componentDidMount() {
        if (this.state.sanPhams.length === 0) {
            axios.get("http://localhost:8080/api/test/san-pham/khuyen-mai")
                .then(res => {
                    this.setState({ sanPhams: res.data })
                })
                .catch(err => {
                    console.error("Looi khi load san pham ", err)
                })
        }
    }
    handleClickPage(number) {
        if (number >= 1) {
            this.setState({ currentPage: number })
        }
    }
    render() {
        const productData = this.state.sanPhams
        const { hinhAnh } = this.props
        const { productOnPage, currentPage } = this.state
        const lastProduct = currentPage * productOnPage
        const firstProduct = lastProduct - productOnPage
        const sanPhamdaCat = productData.slice(firstProduct, lastProduct)
        const pageNumber = []
        for (let i = 1; i <= Math.ceil(productData.length / productOnPage); i++) {
            pageNumber.push(i)
        }
        return (
            <div>
                <div className="products-promotion" style={{ margin: '40px 153px 20px' }}>
                    <h4 className="products-promotion__lable">
                        Sản phẩm đang giảm giá hot
                        <FontAwesomeIcon className="products-promotion__lable-icon" icon={faBolt} />
                    </h4>
                    <div className="products-promotion__list_row">
                        {sanPhamdaCat.map(product => (
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

                        <nav style={{ width: '100%' }} className="category-product__pagination" aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <a onClick={e => {
                                        e.preventDefault()
                                        this.handleClickPage(currentPage - 1)
                                        window.scrollTo(0, 0)
                                    }} href="/" className="page-link">Trang trước</a>
                                </li>
                                {pageNumber.map(item => (
                                    <li onClick={(e) => {
                                        e.preventDefault()
                                        this.handleClickPage(item)
                                        window.scrollTo(0, 0)
                                    }} key={item} className={`page-item ${currentPage === item ? 'active' : ''}`}>
                                        <a className="page-link" href="/">{item}</a>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === pageNumber.length ? 'disabled' : ''}`}>
                                    <a onClick={e => {
                                        e.preventDefault()
                                        this.handleClickPage(currentPage + 1)
                                        window.scrollTo(0, 0)
                                    }} href="/" className="page-link">Trang Sau</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

const layHinhAnhTuStore = state => ({
    hinhAnh: state.hinhAnh
})

export default connect(layHinhAnhTuStore)(KhuyenMaiAll);