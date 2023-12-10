import React, {Component} from "react";
import './css/PurchaseHistory.css';
import './css/reposive/purchase_history.css'
import axios from "axios";
import { Link } from 'react-router-dom';
import { withCookies } from "react-cookie";
import { connect } from "react-redux";

class PurchaseHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idKhachHang : '', // can thay va lay tu csdl
            listDonHang: [],
        }
    }

    componentDidMount(){
        const {cookies} = this.props
        this.setState({idKhachHang: cookies.get('User')})
        axios.get(`http://localhost:8080/api/test/don-hang/${cookies.get('User')}`)
            .then(res => {
                this.setState({listDonHang : res.data})
            })
            .catch(err => {
                console.log("loi khi load du lieu o lich su mua hang: ",err)
            })
    }

    render(){
        const {listDonHang} = this.state
        const {hinhAnh} = this.props
        return(
            <div className="history-wapper">
                <h1 className="history-title">Lịch sử mua hàng:</h1>
                <div className="history-list">
                    {listDonHang.map((item, index) => (
                        <Link to={{pathname: `/lich-su-mua-hang/${item.dh_id}` , state: {donhang: item, hinhAnh: this.state.hinhAnh}}} key={index} className="history-list-item">
                            <div className="history-list-item__top">
                                <p className="history-list-item__idDonHang">Mã Đơn hàng: <span>LTFY4{item.dh_id}NTMY</span></p>
                                <p className="history-list-item__status history-list-item__status--proccess">{item.tinhTrangDonHang.ttdh_ten}</p>
                            </div>
                            <div className="wapper-list-product">
                                {item.chiTietDonHang.map((product, index2) => (
                                    <div key={index2} className="history-list-item__mid">
                                        <div className="history-list-item__br-imgs" >
                                            <div className="history-list-item__img" style={{backgroundImage: `url(data:image/jpg;base64,${hinhAnh[product.sanPham.sp_id]})`}}></div>
                                        </div>
                                        <div className="history-list-item__info">
                                            <h2 className="history-list-item__name">{product.sanPham.sp_ten}</h2>
                                            <p className="history-list-item__quantity">Số lượng: <span>{product.ctdh_soLuong}</span></p>
                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="history-list-item__bottom">
                            <p className="history-list-item__price">Tổng giá trị đơn hàng: <span>{item.dh_tongGia.toLocaleString()}đ</span></p>
                                <Link to={{pathname: `/lich-su-mua-hang/${item.dh_id}` , state: {donhang: item}}} className="history-list-item__link">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }
}

const layHinhAnhTuStore = state => ({
    hinhAnh: state.hinhAnh
})

export default withCookies(connect(layHinhAnhTuStore)(PurchaseHistory));