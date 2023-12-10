import React, { Component } from "react";
import './css/DetailPurchaseHistory.css';
import './css/reposive/detail_purchase_history.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from "axios";
import ReviewForm from "../components/ReviewForm/ReviewForm";
import { connect } from "react-redux";

class DetailPurchaseHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.location.state.donhang,
            idDonHang: this.props.match.params.donhangID,
            comments: [],
            sanPhams: this.props.location.state.donhang.chiTietDonHang.map(sanPham => ({
                ...sanPham,
                showFormReview: false
            })),
            hasReview: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8080/api/test/danh-gia/don-hang/${this.state.idDonHang}`)
            .then(res => {
                this.setState({ comments: res.data })
                let mang = []
                res.data.map(item => (
                    mang.push(item.sanPham.sp_id)
                ))
                this.setState({ hasReview: mang })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleShowReviewForm = (idSanPham) => {
        this.setState((prevState) => {
            const update = prevState.sanPhams.map(sanPham => {
                if (sanPham.sanPham.sp_id === idSanPham) {
                    return {
                        ...sanPham,
                        showFormReview: !sanPham.showFormReview
                    }
                }
                return sanPham
            })
            return { sanPhams: update }
        })
    }
    render() {
        const donhang = this.state.data
        const {hinhAnh} = this.props 
        const sanPhams = this.state.sanPhams
        const daReview = this.state.hasReview
        return (
            <div className="detail-order-wapper">
                <div className="detail-order-container">
                    <div className="detail-order-top">
                        <Link to={"/lich-su-mua-hang"} className="detail-order-back__link">
                            <FontAwesomeIcon className="detail-order-back__link-icon" icon={faCaretLeft} />
                            Trở lại
                        </Link>
                        <div className="detail-order-top-right">
                            <p className="detail-order__idDonhang">Mã Đơn hàng: <span>LTFY4{donhang.dh_id}NTMY</span></p>
                            <p className="detail-order__status detail-order__status--proccessing">{donhang.tinhTrangDonHang.ttdh_ten}</p>
                        </div>
                    </div>
                    <div className="detail-order-address">
                        <h2 className="detail-order-address-title">Địa chỉ giao hàng:</h2>
                        <div className="detail-order-address-content">
                            <p className="detail-order-address-content__date">Ngày đặt hàng: <span>{donhang.dh_ngayDatHang}</span></p>
                            <p className="detail-order-address-content__name">Tên khách hàng: <span>{donhang.khachHang.kh_ten}</span></p>
                            <p className="detail-order-address-content__phone">SĐT: <span>{donhang.khachHang.kh_sdt}</span></p>
                            <p className="detail-order-address-content__address">Địa chỉ nhận hàng: <span>{donhang.dh_diaChiGiaoHaang}</span></p>
                        </div>
                    </div>
                    {sanPhams.map((product, index2) => (
                        <div key={index2} className="detail-order-main">
                            <div className="detail-order-main-content-left">
                                <div className="detail-order-main-content__img" style={{ backgroundImage: `url(data:image/png;base64,${hinhAnh[product.sanPham.sp_id]})` }}></div>
                            </div>
                            <div className="detail-order-main-content-right">
                                <h2 className="detail-order-main-content__name">{product.sanPham.sp_ten}</h2>
                                <p className="detail-order-main-content__quantity">Số lượng: <span>{product.ctdh_soLuong}</span></p>
                                {donhang.tinhTrangDonHang.ttdh_id === 4 ?
                                    <div className="detail-order-comments">
                                        {
                                            product.sanPham.sp_id === daReview[index2] ?
                                                (<div style={{ color: '#1E73BE', fontWeight:'600' }}>*Đã đánh giá</div>) :
                                                (<div>
                                                    <button onClick={() => this.handleShowReviewForm(product.sanPham.sp_id)} type="button" className="btn btn-primary">Đánh giá</button>
                                                    {product.showFormReview && (
                                                        <ReviewForm idDonHang={donhang.dh_id} idSanPham={product.sanPham.sp_id} />
                                                    )}
                                                </div>)
                                        }
                                    </div>
                                    :
                                    ''
                                }
                            </div>
                        </div>
                    ))}
                    <div className="detail-order-note">
                        <h5 className="detail-order-note-title">*Ghi chú cho đơn hàng:</h5>
                        <span>{donhang.dh_ghiChu}</span>
                    </div>
                    <div className="detail-order-pay">
                        <div className="detail-order-pay__box-price">
                            <p className="detail-order-pay__box-pric-title">Thành tiền:</p>
                            <p className="detail-order-pay__price">{donhang.dh_tongGia.toLocaleString()}đ</p>
                        </div>
                        <div className="detail-order-payment__methods">
                            <p className="detail-order-payment__methods-title">Phương thức thanh toán:</p>
                            <p className="detail-order-payment__methods-name">{donhang.hinhThucThanhToan.httt_ten}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const layHinhAnhTuStore = state => ({
    hinhAnh: state.hinhAnh
})

export default connect(layHinhAnhTuStore)(DetailPurchaseHistory);