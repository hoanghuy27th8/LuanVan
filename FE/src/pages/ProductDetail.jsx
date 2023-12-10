import React, { Component } from "react";
import './css/ProductDetail.css';
import './css/reposive/productdetail.css'
import QuantitySelector from '../components/QuantitySelector/QuantitySelector';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import Loading from "../components/Loading/Loading";
import HeaderComponent from "../components/Header/HeaderComponent";
import FooterComponent from "../components/Footer/FooterComponent";
import { Link } from 'react-router-dom';
import AlertSuccess from "../components/Alert/AlertSuccess";
import { withCookies } from "react-cookie";
import AlertError from "../components/Alert/AlertError";

class ProductDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
            hinhAnh: [],
            currentIndexImg: 0,
            numberProduct: 0,
            comments: [],
            showThongBao: false,
            showThongBaoErr: false,
            thongbao: '',
            idUser: ''
        }
        this.handleChangeImgClick = this.handleChangeImgClick.bind(this);
    }

    componentDidMount() {
        const { cookies } = this.props
        this.setState({ idUser: cookies.get('User') })
        axios.get(`http://localhost:8080/api/test/san-pham/${this.props.match.params.sanphamID}`)
            .then(res => {
                this.setState({ product: res.data })
                this.loadAnhTheoID(this.props.match.params.sanphamID)
                this.loadCommentOfProduct()
            })
            .catch(err => {
                console.error("Loi khi load chi tiet san pham: ", err)
            })
    }

    loadAnhTheoID(id) {
        axios.get(`http://localhost:8080/api/test/images?sanphamID=${id}`)
            .then(res => {
                this.setState({ hinhAnh: res.data })
            })
            .catch(err => {
                console.error("Looi khi load hinh anh ", err)
            })
    }
    handleChangeImgClick(index) {
        this.setState({ currentIndexImg: index })
    }
    loadCommentOfProduct() {
        axios.get(`http://localhost:8080/api/test/danh-gia/san-pham/${this.props.match.params.sanphamID}`)
            .then(res => {
                res.data.sort((a, b) => new Date(b.dg_ngayDanhGia) - new Date(a.dg_ngayDanhGia))
                const newsComment = res.data.slice(0, 2)
                this.setState({ comments: newsComment })
                console.log(newsComment)
            })
            .catch(err => {
                console.log(err)
            })
    }


    //Xử lý thêm sản phẩm vào giỏ hàng với số lượng `quantity`
    addToCart = (quantity) => {
        let gia = 0;
        this.state.product.khuyenMai !== null
            ? gia = (this.state.product.sp_gia * (100 - this.state.product.khuyenMai.gg_mucgiamgia)) / 100
            : gia = this.state.product.sp_gia
        const addNewProduct = [{
            donGia: gia,
            soLuong: quantity,
            sanPham: this.state.product
        }]
        console.log(addNewProduct)
        const idUser = this.state.idUser
        axios.post(`http://localhost:8080/api/test/gio-hang/${idUser}`, addNewProduct)
            .then(res => {
                console.log(res.data)
                this.setState({ numberProduct: res.data.gh_tongSL })
                this.setState({
                    showThongBao: true,
                    thongbao: 'Thêm thành công vào giỏ hàng'
                })
                this.props.history.push("/gio-hang")
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    showThongBaoErr: true,
                    thongbao: 'Thêm vào giỏ hàng thất bại'
                })
            })

    };
    handleClickBuyNow() {
        const quantity = this.quantityInputRef.current.value
        console.log(quantity)
    }
    closeAlert = () => {
        this.setState({ showThongBao: false,showThongBaoErr: false, thongbao: '' });
    };


    render() {
        const { product, hinhAnh, comments, showThongBao, thongbao, showThongBaoErr } = this.state
        if (product === null) {
            return (<Loading />)
        } else {
            return (
                <div>
                    <HeaderComponent numberProduct={this.state.numberProduct} />
                    <div className="produt-wapper">
                        <div className="productDetail-nav">
                            <a href="/" className="nav-pre__link">Trang chủ</a>
                            <span> / </span>
                            <a href="/" className="nav-current__link">{product.thuonghieu.th_ten}</a>
                        </div>

                        <div className="product-detail">
                            {showThongBao === true ? <AlertSuccess message={thongbao} closeAlert={this.closeAlert} /> : ''}
                            {showThongBaoErr === true ? <AlertError message={thongbao} closeAlert={this.closeAlert} /> : ''}
                            <h1 className="product-detail-nameProduct">{product.sp_ten}</h1>
                            <div className="product-detail-main">
                                <div className="product-detail-main-left cl-4">
                                    <div className="product-detail-main-imgs">
                                        <div className="product-detail-main-img__lg" style={{ backgroundImage: `url(data:image/jpg;base64,${hinhAnh[this.state.currentIndexImg]})` }}></div>
                                        <div className="product-detail-main-img-list">
                                            {hinhAnh.map((anh, index) => (
                                                <div key={index}
                                                    onClick={() => this.handleChangeImgClick(index)}
                                                    className={`product-detail-main-img-item cl-4 ${index === this.state.currentIndexImg ? 'active' : ''}`}
                                                    style={{ backgroundImage: `url(data:image/png;base64,${anh})`, backgroundColor:'unset' }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="product-detail-main-mid cl-4">
                                    {product.khuyenMai !== null ?
                                        <div>
                                            <h4 className="product-detail-mid-price">{(product.sp_gia * (100 - product.khuyenMai.gg_mucgiamgia) / 100).toLocaleString()}đ</h4>
                                            <div className="product-detail-mid-old-price">
                                                <h4>Giá gốc: <span>{product.sp_gia.toLocaleString()}đ</span></h4>
                                                <p className="product-detail-mid-saleoff">-{product.khuyenMai.gg_mucgiamgia}%</p>
                                            </div>
                                        </div> :
                                        <div>
                                            <h4 className="product-detail-mid-price">{product.sp_gia.toLocaleString()}đ</h4>
                                            <div className="product-detail-mid-old-price">
                                                <h4>Giá gốc: <span style={{ textDecoration: "none" }}>{product.sp_gia.toLocaleString()}đ</span></h4>
                                                <p className="product-detail-mid-saleoff" style={{ color: "#fff" }}>-0%</p>
                                            </div>
                                        </div>
                                    }
                                    {product.sp_soluong !== 0 ?
                                        <div>
                                            <div className="product-detail-mid-status">
                                                Tình trạng: <span>Còn hàng</span>
                                            </div>
                                            <QuantitySelector onAddToCart={this.addToCart} />
                                            <button onClick={this.handleClickBuyNow} className="product-detail-mid-btnMua">
                                                <p>Mua ngay</p>
                                                <span>Giao hàng tận nơi hoặc nhận tại cửa hàng</span>
                                            </button>
                                        </div>
                                        : <div className="product-detail-mid-status">
                                            Tình trạng: <span style={{ color: 'red' }}>Hết hàng</span>
                                        </div>
                                    }
                                </div>
                                <div className="product-detail-main-right cl-4">
                                    <div className="product-detail-right-warranty">
                                        <h3 className="product-detail-right-warranty-lable">Thông tin bảo hành</h3>
                                        <div className="product-detail-right-warranty-content">
                                            <p>✅Bảo hành 12 tháng Laptop4YOU</p>
                                            <p>✅ MIỄN PHÍ GIAO HÀNG TẬN NHÀ</p>
                                            <p>- Hư gì đổi nấy 12 tháng tại cửa hàng (miễn phí tháng đầu)</p>
                                            <p>- Bộ sản phẩm gồm: Sách hướng dẫn, Thùng máy, Sạc Laptop</p>
                                        </div>
                                    </div>
                                    <div className="product-detail-right-yentammuahang">
                                        <h3 className="product-detail-right-yentammuahang-lable">Yên tâm mua hàng</h3>
                                        <div className="product-detail-right-yentammuahang-content">
                                            <p>Đại lý phân phối hàng chính hãng</p>
                                            <p>Giá luôn tốt nhất</p>
                                            <p>Bảo hành dài, hậu mãi chu đáo</p>
                                            <p>Miễn phí giao hàng toàn quốc</p>
                                        </div>
                                    </div>
                                    <div className="product-detail-right-banner" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/banner-right-detail.png)` }}></div>
                                </div>
                            </div>

                            <div className="product-detail-desc">
                                <div className="product-detail-desc-content">
                                    <h3 className="product-detail-desc-content-title"><span>Đặt điểm nổi bật</span></h3>
                                    <div className="product-detail-content">
                                        <h1 className="product-detail-content-name">{product.sp_ten}</h1>
                                        <p>{product.sp_mota}</p>
                                    </div>
                                </div>
                                <div className="product-detail-desc-productSpec">
                                    <div className="product-detail-desc-productSpec-content">
                                        <h3 className="productSpec-content-title"><span>Thông số kỹ thuật</span></h3>
                                        <div className="productSpec-content-desc">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Bộ vi xử lý</td>
                                                        <td>{product.sp_cpu}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Bộ nhớ trong</td>
                                                        <td>{product.sp_ram}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>VGA</td>
                                                        <td>{product.sp_card}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ổ cứng</td>
                                                        <td>{product.sp_ocung}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Màn hình</td>
                                                        <td>{product.sp_manhinh}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Giao tiếp không dây</td>
                                                        <td>Wi-Fi 6(802.11ax)+Bluetooth 5.0 (Dual band) 2*2</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="product-detai-comment">
                                <div className="product-detai-comment-left">
                                    <h1 className="detai-comment-left-title">
                                        Đánh giá của
                                        <span> {product.sp_ten}</span>
                                    </h1>
                                    <div className="detai-comment-left-list">
                                        {comments.map((item, index) => (
                                            <div key={index} className="detai-comment-left-item">
                                                <h6 className="detai-comment-item-name">{item.donHang.khachHang.kh_ten}</h6>
                                                <h6 className="comment-date">Ngày đánh giá: {item.dg_ngayDanhGia}</h6>
                                                {/* <div className="detai-comment-item-rank">
                                                    <FontAwesomeIcon className="detai-comment-item-rank-icon ranked-selected" icon={faStar} />
                                                    <FontAwesomeIcon className="detai-comment-item-rank-icon ranked-selected" icon={faStar} />
                                                    <FontAwesomeIcon className="detai-comment-item-rank-icon ranked-selected" icon={faStar} />
                                                    <FontAwesomeIcon className="detai-comment-item-rank-icon ranked-selected" icon={faStar} />
                                                    <FontAwesomeIcon className="detai-comment-item-rank-icon" icon={faStar} />
                                                </div> */}
                                                <p className="detai-comment-item-content">{item.dg_noiDung}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        to={{
                                            pathname: `/danh-gia/${product.sp_id}`,
                                            state: { hinhAnh: hinhAnh[0], product: product, comments: comments }
                                        }}
                                        className="detai-comment-left-btn-more">Xem thêm đánh giá
                                    </Link>
                                </div>
                                <div className="product-detai-comment-right"></div>
                            </div>
                        </div>
                    </div>
                    <FooterComponent />
                </div>
            );
        }
    }
}

export default withCookies(ProductDetail);