import React, { Component } from "react";
import '../Khuyenmai/KhuyenMai.css'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class SuggestComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sanPhams: this.props.sanPhams,
            productOnPage: 10,
            currentPage: 1
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
            <div className="products-promotion__list_row">
                {sanPhamdaCat.map((product, index) => (
                    <div key={index} className="product-category-home__item mt-2">
                        <Link to={`/san-pham/${product.sp_id}`} className="product-category-home__content">
                            <div className="product-category-home__content-img" style={{ backgroundImage: `url(data:image/jpg;base64,${hinhAnh[product.sp_id]})` }}></div>
                            <div className="product-category-home__content-info">
                                <h4 className="product-category-home__content-name">{product.sp_ten}</h4>
                                <div className="product-category-home__content-brief">
                                    <table className="product-category-home__content-table">
                                        <tbody>
                                            <tr>
                                                <td>CPU</td>
                                                <td>{product.sp_cpu}</td>
                                            </tr>
                                            <tr>
                                                <td>RAM</td>
                                                <td>{product.sp_ram}</td>
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
                                <div className="product-category-home__content-price">
                                    {product.khuyenMai !== null ?
                                        <div>
                                            <div className="home__content-price-top">
                                                <p className="home__content-price-old">{product.sp_gia.toLocaleString()}đ</p>
                                                <p className="home__content-price-saleoff">-{product.khuyenMai.gg_mucgiamgia}%</p>
                                            </div>
                                            <div className="home__content-price-bottom">
                                                <p className="new-price">{(product.sp_gia * (100 - product.khuyenMai.gg_mucgiamgia) / 100).toLocaleString()} đ</p>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className="home__content-price-top" style={{ padding: "13.5px 0" }}>
                                                {/* <p className="home__content-price-old">{product.sp_gia.toLocaleString()}đ</p>
                                                    <p className="home__content-price-saleoff" >-0%</p> */}
                                            </div>
                                            <div className="home__content-price-bottom">
                                                <p className="home__content-price-new">{product.sp_gia.toLocaleString()}đ</p>
                                            </div>
                                        </div>
                                    }
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
        );
    }
}

const layHinhAnhTuStore = (state) => ({
    hinhAnh: state.hinhAnh,
});

export default connect(layHinhAnhTuStore)(SuggestComponent)