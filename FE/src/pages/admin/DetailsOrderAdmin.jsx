import React, { Component } from "react";
import MenuAdmin from "./components/MenuAdmin";
import '../css/admin/DetailsOrderAdmin.css'
import axios from "axios";
import LoadingIcon from "../../components/Loading/Loading";
import { connect } from "react-redux";

class DetailsOrderAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idDonHang: this.props.match.params.orderId,
            donHang: null,
        }
    }
    authenticationUser() {
        const { cookies } = this.props
        this.setState({ idAdmin: cookies.get('User') })
        if (cookies.get('User') === undefined || cookies.get('Role') !== 'ADMIN') {
            this.props.history.push("/dang-nhap")
        }
    }
    componentDidMount() {
        // this.authenticationUser()
        const idDonHang = this.state.idDonHang
        axios.get(`http://localhost:8080/api/test/don-hang/${idDonHang}/chi-tiet`)
            .then(res => {
                this.setState({ donHang: res.data })
            })
            .catch(err => {
                console.log("Lỗi khi lấy đơn hàng theo id tại DetailsOrderAdmin: ", err)
            })
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    handleExportPDF = (idDonHang) => {
        axios({
            url: `http://localhost:8080/api/test/don-hang/${idDonHang}/xuat-pdf`,
            method: 'GET',
            responseType: 'blob'
        })
            .then(res => {
                const blob = new Blob([res.data], { type: 'application/pdf' })
                const url = window.URL.createObjectURL(blob)
                window.open(url)
            })
            .catch(err => {
                console.log("LỖi khi xuất PDF đơn hàng: ", err)
            })
    }

    render() {
        const { donHang, idDonHang } = this.state
        const {hinhAnh} = this.props
        if (donHang === null) return <LoadingIcon />
        let sumProducts = donHang.chiTietDonHang.reduce((total, item) => total + item.ctdh_soLuong, 0);
        return (
            <div className="container-admin" style={{ display: 'flex' }}>
                <div className="container-left" style={{ width: 'calc(100%/12*2)' }}><MenuAdmin /></div>
                <div className="container-right" style={{ width: 'calc(100%/12*10)' }}>
                    <div className="content-main">
                        <div className="content-main__top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex' }}>
                                <button onClick={this.handleBack} type="button" class="btn btn-info">Trở về</button>
                                <button onClick={() => this.handleExportPDF(idDonHang)} style={{ fontWeight: '600' }} type="button" className="btn btn-warning ml-1">Xuất hóa đơn PDF</button>
                            </div>
                            <div className="content-main__infoTop" style={{ display: 'flex' }}>
                                <h2 className="content-main__orderID">Mã đơn hàng:<span>LTFY4{idDonHang}NTMY</span></h2>
                                <h2 className="content-main__status">{donHang.tinhTrangDonHang.ttdh_ten}</h2>
                            </div>
                        </div>
                        <div className="content-main__main">
                            <div className="content-main__address">
                                <h2 className="content-main__title">Địa chỉ</h2>
                                <h4 className="content-main__nameCustormer">{donHang.khachHang.kh_ten}</h4>
                                <p className="content-main__phoneNumber">{donHang.khachHang.kh_sdt}</p>
                                <p className="content-main__detailAddress">{donHang.dh_diaChiGiaoHaang}</p>
                            </div>
                            <div className="content-main__listProduct">
                                <h2 className="content-main__title">Sản phẩm:</h2>
                                {donHang.chiTietDonHang.map(item => (
                                    <div key={item.sanPham.sp_id} className="content-main__item" style={{ display: 'flex' }}>
                                        <div className="content-main__itemLeft" style={{ width: 'calc(100%/12*1)' }}>
                                            <div className="content-main__imgProduct" style={{ backgroundImage: `url(data:image/jpg;base64,${hinhAnh[item.sanPham.sp_id]})` }}></div>
                                        </div>
                                        <div className="content-main__itemRight" style={{ width: 'calc(100%/12*11)' }}>
                                            <div className="content-main__infoProduct">
                                                <h5 className="product-name">{item.sanPham.sp_ten}</h5>
                                                <p className="product-quantity">Số lượng: <span>{item.ctdh_soLuong}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="content-main__bottom">
                            <h5 className="content-main__smQuantity">Tổng số lượng: <span>{sumProducts}</span></h5>
                            <h5 className="content-main__sumPrice">Thành tiền: <span>{donHang.dh_tongGia.toLocaleString()} đ</span></h5>
                            <h5 className="content-main__typePay">Phương thức thanh toán: <span>{donHang.hinhThucThanhToan.httt_ten}</span></h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const layAnhtuStore = state => ({
    hinhAnh: state.hinhAnh
})

export default connect(layAnhtuStore)(DetailsOrderAdmin);