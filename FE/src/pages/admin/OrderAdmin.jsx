import React, { Component } from "react";
import MenuAdmin from "./components/MenuAdmin";
import '../css/admin/OrderAdmin.css';
import axios from "axios";
import AlertSuccess from "../../components/Alert/AlertSuccess";
import AlertError from "../../components/Alert/AlertError";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

class OrderAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusOptionsOrder: [],
            donHangs: [],
            thongbao: null,
            showThongBao: false,
            showThongBaoError: false
        };
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
        axios.get(`http://localhost:8080/api/test/don-hang`)
            .then(res => {
                this.setState({ donHangs: res.data })
            })
            .catch(err => {
                console.log("loi khi load tat ca don hang tai Order Admin: ", err)
            })
        axios.get(`http://localhost:8080/api/test/tinh-trang-don-hang`)
            .then(res => {
                this.setState({ statusOptionsOrder: res.data })
            })
            .catch(err => {
                console.log("loi khi load tat ca trang thai don hang tai Order Admin: ", err)
            })

    }
    renderLaiData = () => {
        axios.get(`http://localhost:8080/api/test/don-hang`)
            .then(res => {
                console.log(res.data);
                this.setState({ donHangs: res.data });
            })
            .catch(err => {
                console.log("Lỗi khi tải lại tất cả đơn hàng trong OrderAdmin: ", err);
            });
    };

    handleStatusChange = (e, idDonHang) => {
        const { value } = e.target;
        this.setState({ selectedStatus: value });
        axios.post(`http://localhost:8080/api/test/don-hang/cap-nhat-trang-thai/${idDonHang}/${value}`)
            .then(res => {
                this.setState({
                    thongbao: `Cập nhật trạng thái thành công`,
                    showThongBao: true
                })
                this.renderLaiData()
                console.log(res.data)
            })
            .catch(err => {
                this.setState({
                    thongbao: `Cập nhật trạng thái thất bại`,
                    showThongBaoError: true
                })
                console.log("loi khi cap nhat trang thai don hang o OrderAdmin: ", err)
            })
    };

    closeAlert = () => {
        this.setState({ showThongBao: false, thongbao: '' });
    };

    handleViewDetailsClick = (orderId) => {
        const { history } = this.props
        history.push(`/admin/don-hang/${orderId}`)
    }

    render() {
        const { statusOptionsOrder, donHangs, showThongBao, showThongBaoError, thongbao } = this.state;
        const donHangsReversed = [...donHangs].sort((a, b) => b.dh_id - a.dh_id);
        return (
            <div className="container-admin" style={{ display: "flex" }}>
                <div className="container-left" style={{ width: 'calc(100%/12*2)' }}><MenuAdmin /></div>
                <div className="container-right" style={{ width: 'calc(100%/12*10)' }}>
                    <div className="content-main">
                        <h2 className="content-main__title">Danh sách đơn hàng</h2>
                        {showThongBao === true ? <AlertSuccess message={thongbao} closeAlert={this.closeAlert} /> : ''}
                        {showThongBaoError === true ? <AlertError message={thongbao} closeAlert={this.closeAlert} /> : ''}
                        <table className="order-table" style={{ border: '2px solid #ddd' }}>
                            <thead>
                                <tr>
                                    <td className="content-table__title" style={{ width: '5%' }}>ID</td>
                                    <td className="content-table__title" style={{ width: '15%' }}>Tên khách hàng</td>
                                    <td className="content-table__title" style={{ width: '10%', textAlign: 'center' }}>Tổng giá</td>
                                    <td className="content-table__title" style={{ width: '10%' }}>Ngày đặt</td>
                                    <td className="content-table__title" style={{ width: '20%' }}>Trạng thái</td>
                                    <td className="content-table__title" style={{ width: '15%' }}>Thanh toán</td>
                                    <td className="content-table__title" style={{ width: '10%' }}></td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    donHangsReversed.map(donHang => (
                                        <tr key={donHang.dh_id} className="content-table__row">
                                            <td className="content-table__value">{donHang.dh_id}</td>
                                            {donHang.khachHang !== null ?
                                                <td className="content-table__value">{donHang.khachHang.kh_ten}</td> : ''
                                            }
                                            <td className="content-table__value">{donHang.dh_tongGia.toLocaleString()} đ</td>
                                            <td className="content-table__value">{donHang.dh_ngayDatHang}</td>
                                            {donHang.tinhTrangDonHang !== null ?
                                                <td className="content-table__value">
                                                    <select
                                                        onChange={(e) => this.handleStatusChange(e, donHang.dh_id)}
                                                        className="select-status"
                                                        value={donHang.tinhTrangDonHang.ttdh_id}
                                                    >
                                                        {statusOptionsOrder.map((status) => (
                                                            <option key={status.ttdh_id} value={status.ttdh_id}>
                                                                {status.ttdh_ten}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                : ''
                                            }
                                            {donHang.hinhThucThanhToan !== null ?
                                                <td className="content-table__value">{donHang.hinhThucThanhToan.httt_ten}</td>
                                                : ''
                                            }
                                            <td className="content-table__value">
                                                <button onClick={() => this.handleViewDetailsClick(donHang.dh_id)} type="button" className="btn btn-primary">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderAdmin;