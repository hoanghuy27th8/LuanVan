import React, { Component } from "react";
import './ProductHome.css';
import '../../pages/css/reposive/productshome.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import BackToTopButton from "../ButtonBackToTop/ButtonBackToTopComponent";
import axios from "axios";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class ProductsHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sanPhams: []
        }
    }
    componentDidMount() {
        const item = this.props.thuonghieu;
        axios.get(`http://localhost:8080/api/test/san-pham/thuong-hieu/${item.th_id}`)
            .then(res => {
                this.setState({ sanPhams: res.data })
                // res.data.forEach(product => {
                //     this.loadAnhTheoID(product.sp_id);
                // });
            })
            .catch(err => {
                console.log("loi khi lay san pham theo thuong hieu")
            })
    }

    // loadAnhTheoID(id) {
    //     axios.get(`http://localhost:8080/api/test/images?sanphamID=${id}`)
    //         .then(res => {
    //             // console.log(res.data[0])
    //             const { hinhAnhs } = this.state
    //             hinhAnhs[id] = res.data[0]
    //             this.setState({ hinhAnhs })
    //         })
    //         .catch(err => {
    //             console.error("Looi khi load hinh anh ", err)
    //         })
    // }

    render() {
        const sanpham = this.state.sanPhams
        const thuonghieu = this.props.thuonghieu.th_ten
        const idthuonghieu = this.props.thuonghieu.th_id
        const {hinhAnh} =this.props
        const dataToRender = sanpham.length > 5 ? sanpham.slice(sanpham.length - 5) : sanpham;
        return (
            <div className="product-category-home">
                <div className="product-category-home__title">
                    <h4 className="product-category-home__title-name">{thuonghieu}</h4>
                    <Link to={{pathname: `/danh-muc/${thuonghieu}`, state: {idThuongHieu : idthuonghieu, tenThuongHieu: thuonghieu
                    }}} className="product-category-home__title-link">
                        Xem tất cả
                        <FontAwesomeIcon className="product-category-home__title-link-icon" icon={faSortDown} />
                    </Link>
                </div>
                <div className="product-category-home__list">
                    {dataToRender.map((product, index) => (
                        <div key={index} className="product-category-home__item">
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
                                                <div className="home__content-price-top" style={{padding: "13.5px 0"}}>
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
                </div>
                <BackToTopButton />
            </div>
        );
    }
}

const layHinhAnhTuStore = (state) => ({
    hinhAnh: state.hinhAnh,
});

export default connect(layHinhAnhTuStore)(ProductsHome)