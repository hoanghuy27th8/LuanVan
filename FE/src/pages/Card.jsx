import React, { Component } from "react";
import './css/Card.css';
import './css/reposive/card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import LoadingIcon from "../components/Loading/Loading";
import { Link } from 'react-router-dom';
import AlertSuccess from "../components/Alert/AlertSuccess";
import { withCookies } from 'react-cookie';
import { connect } from "react-redux";
import { updateNumber } from "../redux/action/cartNumber"; 

class Card extends Component {
    constructor() {
        super()
        this.state = {
            cart: null,
            showThongBao: false,
            thongbao: '',
            idUser: ''
        }
    }

    componentDidMount() {
        const { cookies } = this.props
        this.setState({ idUser: cookies.get('User') });

        axios.get(`http://localhost:8080/api/test/gio-hang/${cookies.get('User')}`)
            .then(res => {
                console.log(res.data)
                this.setState({ cart: res.data })
            })
            .catch(err => {
                console.error("loi khi load san pham trong gio hang: ", err)
            })

    }
    handleDeleteProductInCart(id) {
        const idUser = this.state.idUser
        axios.delete(`http://localhost:8080/api/test/gio-hang/${idUser}/${id}`)
            .then(res => {
                this.setState({ cart: res.data }) 
                this.setState({
                    showThongBao: true,
                    thongbao: 'Xóa sản phẩm khỏi giỏ hàng thành công'
                })
                console.log(res.data)
            })
            .catch(err => {
                console.log("loi khi xoa san pham khoi gio hang: ", err)
            })
    }

    closeAlert = () => {
        this.setState({ showThongBao: false, thongbao: '' });
    };

    render() {
        const { cart, showThongBao, thongbao } = this.state
        console.log(cart)
        const {hinhAnh} = this.props
        if (cart === null) return <LoadingIcon />
        else
        this.props.updateNumber(cart.gh_tongSL)
            return (
                <div className="card-wapper">
                    <div className="card">
                        <h1 className="card-name">Giỏ hàng</h1>
                        {showThongBao === true ? <AlertSuccess message={thongbao} closeAlert={this.closeAlert} /> : ''}
                        <div className="card-detail row">
                            <div className="card-detail-left col col-7">
                                {cart.gh_tongSL !== 0 ? "" :
                                    <div>
                                        <img className="cart-empty__img" src="/cart-empty.webp" alt="" />
                                    </div>
                                }
                                {cart.chiTietGioHang.map((item, index) => (
                                    <div key={index} className="card-detail-left-item">
                                        <div className="card-detail-left_img" style={{ backgroundImage: `url(data:image/png;base64,${hinhAnh[item.sanPham.sp_id]})` }}></div>
                                        <div className="card-detail-left-info">
                                            <h4 className="card-detail-left-info-name">{item.sanPham.sp_ten}</h4>
                                            <div className="card-detail-left_info-price">
                                                {item.sanPham.khuyenMai !== null ? (
                                                    <div style={{ display: "flex" }}>
                                                        <p className="card-detail-left_info-price-current ">{(item.sanPham.sp_gia * (100 - item.sanPham.khuyenMai.gg_mucgiamgia) / 100).toLocaleString()} đ</p>
                                                        <p className="card-detail-left_info-price-old ">{item.sanPham.sp_gia.toLocaleString()}đ</p>
                                                        <p className="card-detail-left_info-price-saleoff ">-{item.sanPham.khuyenMai.gg_mucgiamgia}%</p>
                                                    </div>
                                                ) : (
                                                    <p className="card-detail-left_info-price-old ">{item.sanPham.sp_gia.toLocaleString()}đ</p>
                                                )}

                                            </div>
                                            <div className="card-detail-left_info-quantity">
                                                <p>Chọn số lượng:</p>
                                                <div className="card-quatity-remote">
                                                    <button className="decrease-quantity">-</button>
                                                    <input type="number" className="input-quatity" defaultValue={item.ctgh_soLuong} />
                                                    <button className="increase-quantity">+</button>
                                                </div>
                                                <button type="button" onClick={() => this.handleDeleteProductInCart(item.sanPham.sp_id)} className="card-quatity-removebtn">
                                                    <FontAwesomeIcon style={{ cursor: "pointer" }} className="card-quatity-removebtn-icon" icon={faTrash} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="card-detail-left-btnexit">
                                    <Link to="/" className="exit-continune">
                                        <FontAwesomeIcon className="exit-continune-icon" icon={faArrowLeft} />
                                        Tiếp tục xem sản phẩm
                                    </Link>
                                    <a href="/" className="exit-update-card">Cập nhật giỏ hàng</a>
                                </div>
                            </div>
                            <div className="card-detail-right col col5">
                                <div className="card-detail-right-content">
                                    <h2 className="card-detail-right-title">Cộng giỏ hàng</h2>
                                    <p className="card-detail-right-subtotal">
                                        <span>Tổng số lượng sản phẩm:</span>
                                        <span>{cart.gh_tongSL}</span>
                                    </p>
                                    <p className="card-detail-right-total">
                                        <span>Tổng giá trị:</span>
                                        <span>{cart.gh_tongGia.toLocaleString()} đ</span>
                                    </p>
                                    {cart.gh_tongSL === 0 ? '' :

                                        <Link to={{ pathname: '/thanh-toan', state: { cart: this.state.cart } }} className="card-detail-right-thanhtoan">
                                            Tiến hành thanh toán
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

const layHinhAnhTuStore = (state) => ({
    hinhAnh: state.hinhAnh,
    numberProduct: state.numberProduct
})

export default withCookies(connect(layHinhAnhTuStore, {updateNumber})(Card));