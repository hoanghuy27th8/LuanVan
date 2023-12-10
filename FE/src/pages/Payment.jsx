import React, { Component } from "react";
import './css/Payment.css'
import './css/reposive/payment.css';
import axios from "axios";

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.state.cart,
            addressOptions:
                this.props.location.state.cart.khachHang.diaChiKhachHangs.map(item => item.dchk_tenDiaChi)
            ,
            selectedAddress: this.props.location.state.cart.khachHang.diaChiKhachHangs[0].dchk_tenDiaChi,
            methodPay: 1,
            ghiChu: null,
        };
    }
    handleChangeAdress = (e) => {
        this.setState({ selectedAddress: e.target.value });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    

    handleClickRadioOnline = e => {
        const listRadio = document.querySelector('#payment_method-online')
        const online = document.querySelector('.payment_method-online__content')
        const offline = document.querySelector('.payment_method-offline__content')
        listRadio.addEventListener('change', e => {
            online.classList.add('active-pay-method-contetn');
            offline.classList.remove('active-pay-method-contetn');
        })
        this.setState({methodPay: 2})
    }
    handleClickRadioOffline = e => {
        const listRadio = document.querySelector('#payment_method-offline')
        const online = document.querySelector('.payment_method-online__content')
        const offline = document.querySelector('.payment_method-offline__content')
        listRadio.addEventListener('change', e => {
            offline.classList.add('active-pay-method-contetn');
            online.classList.remove('active-pay-method-contetn');
        })
        this.setState({methodPay: 1})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() +1).padStart(2, '0');
        const year = currentDate.getFullYear();
        // const formattedDate = new Date(year, month, day);
        const formattedDate = `${day}-${month}-${year}`;

        // console.log(this.state.data)
        const postData = {
            idKhachHang: this.state.data.khachHang.kh_id,
            sanPhams: this.state.data.chiTietGioHang.map(item => ({
                soLuong: item.ctgh_soLuong,
                sanPham: item.sanPham,
                donGia: 0
            })),
            diaChiGiaoHang: this.state.selectedAddress,
            ghiChu: this.state.ghiChu,
            ngayDatHang: formattedDate,
            idHinhThucThanhToan: this.state.methodPay,
            tinhTrangThanhToan: this.state.methodPay===1? false : true,
            idTinhTrangDonHang: 1
        }
        console.log(postData)
        this.setState({orderRequire: postData})
        postData.tinhTrangThanhToan===true? this.handlePayOnline(postData) : this.handlePayOffline(postData)
    }

    handlePayOffline(data){
        axios.post(`http://localhost:8080/api/test/tao-don-hang`, data)
            .then(res => {
                console.log("thanh toan thanh cong")
                console.log(res.data)
                this.props.history.push(`/lich-su-mua-hang`)
            })
            .catch(err => {
                console.log("loi xay ra khi thanh toan offline: ", err)
            })
    }
    handlePayOnline(data){
        axios.post(`http://localhost:8080/api/test/tao-don-hang`, data)
            .then(res => {
            })
            .catch(err => {
                console.log("loi xay ra khi thanh toan offline: ", err)
            })
        axios.get(`http://localhost:8080/api/test/pay/${this.state.data.gh_tongGia}`)
        .then(res => {
            const paymentURL = res.data
            window.location.href = paymentURL
        })
        .catch(err => {
            console.log("Loi khi dung get o thanh toan vnpay: ",err)
        })
    }

    render() {
        const info = this.state.data
        return (
            <div className="pay-wapper">
                <div className="pay-content__info">
                    <form className="pay-content__form" onSubmit={this.handleSubmit}>
                        <div className="pay-content__form-left">
                            <h1 className="pay-content__title">Thông tin thanh toán</h1>
                            <div className="form-group">
                                <label htmlFor="fullName">Họ Tên:</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    defaultValue={info.khachHang.kh_ten}
                                    value={this.state.fullName}
                                    onChange={this.handleChange}
                                    required
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Địa Chỉ Giao Hàng:</label>
                                <select
                                    id="address"
                                    name="address"
                                    value={this.selectedAddress}
                                    onChange={this.handleChangeAdress}
                                    required
                                    style={{ width: '100%', border: '1px solid #ddd', backgroundColor: '#fff', padding: '5px 12px', fontSize: '15px' }}
                                >
                                    {this.state.addressOptions.map((address, index) => (
                                        <option key={index} value={address}>
                                            {address}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Số Điện Thoại:</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    defaultValue={info.khachHang.kh_sdt}
                                    value={this.state.phoneNumber}
                                    onChange={this.handleChange}
                                    required
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    defaultValue={info.khachHang.kh_emial}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required
                                    disabled
                                />
                            </div>
                            <div className="pay-content-detailInfo">
                                <h1 className="pay-content__title">Thông tin bổ sung</h1>
                                <div className="form-group">
                                    <label htmlFor="note">Ghi Chú:</label>
                                    <textarea
                                        id="note"
                                        name="ghiChu"
                                        value={this.state.note}
                                        onChange={this.handleChange}
                                        placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="pay-content__form-right">
                            <div className="pay-content__form-right-wapper">
                                <h1 className="pay-content__title">Đơn hàng của bạn</h1>
                                <table className="pay-content__table">
                                    <thead>
                                        <tr>
                                            <th className="product-name__title">Sản phẩm</th>
                                            <th className="product-price__title">Tạm tính</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {info.chiTietGioHang.map((product, index) => (
                                            <tr key={index} className="product-item">
                                                <td className="product__name">{product.sanPham.sp_ten}</td>
                                                {product.sanPham.khuyenMai===null ? (
                                                    <td className="product__price">{product.sanPham.sp_gia.toLocaleString()}đ <span>x{product.ctgh_soLuong}</span></td>
                                                ):(
                                                    <td className="product__price">{(product.sanPham.sp_gia*(100 - product.sanPham.khuyenMai.gg_mucgiamgia) /100).toLocaleString()}đ <span>x{product.ctgh_soLuong}</span></td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="pay-total__title">Tổng</td>
                                            <td className="pay-total__price">{info.gh_tongGia.toLocaleString()}đ</td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div className="pay-content__type">
                                    <div className="pay-content__list">
                                        <h1 className="pay-content__title">Phương thức thanh toán</h1>
                                        <div className="pay-content__item">
                                            <input onChange={this.handleClickRadioOnline} value={2} id="payment_method-online" className="pay-content__input" type="radio" name="payment_method" />
                                            <label htmlFor="payment_method-online">Thanh toán trực tuyến qua VNPay</label>
                                            <div className="payment_method-online__content">
                                                <p>
                                                    Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Đơn hàng sẽ đươc giao sau khi tiền đã chuyển.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pay-content__item">
                                            <input onChange={this.handleClickRadioOffline} value={1} id="payment_method-offline" className="pay-content__input" type="radio" name="payment_method" />
                                            <label htmlFor="payment_method-offline">Thanh toán khi nhận</label>
                                            <div className="payment_method-offline__content">
                                                <p className="">Trả tiền mặt khi giao hàng</p>
                                            </div>
                                            <button className="btn-submit__payment" type="submit">Thanh Toán</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Payment;