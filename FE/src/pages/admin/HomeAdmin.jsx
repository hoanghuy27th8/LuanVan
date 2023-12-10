import React, { Component } from "react";
import MenuAdmin from "./components/MenuAdmin";
import '../css/admin/HomeAdmin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons';
import SalesRepostAdmin from "./components/SalesReportAdmin";
import LoadingIcon from "../../components/Loading/Loading";
import axios from "axios";
import AlertSuccess from "../../components/Alert/AlertSuccess";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";

class HomeAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idAdmin: '',
            isSelected: 'thang',
            isRender: 0,
            dataThang: [],
            sizeDonhang: 0,
            sizeSanPham: 0,
            sumDoanhThu: 0,
            sanPhamHetHang: [],
            sanPhamNhap: null,
            nhaCungCaps: [],
            nhacungcap: '',
            slNhap: '',
            giaNhap: '',
            thongbao: '',
            showThongBao: false
        }
    }
    authenticationUser(){
        const {cookies} = this.props
        this.setState({idAdmin: cookies.get('User')})
        if(cookies.get('User') === undefined || cookies.get('Role')!=='ADMIN'){
            this.props.history.push("/dang-nhap")
        }
    }
    componentDidMount() {
        this.authenticationUser()
        const date = new Date()
        const nam = date.getFullYear()
        axios.get(`http://localhost:8080/api/test/thong-ke/don-hang/${nam}`)
            .then(res => {
                this.setState({ dataThang: res.data })
            })
            .catch(err => {
                console.log("loi khi get doanh thu theo thang: ", err)
            })
        axios.get(`http://localhost:8080/api/test/san-pham`)
            .then(res => {
                this.setState({ sizeSanPham: res.data.length })
            })
            .catch(err => {
                console.log("loi khi get doanh thu theo thang: ", err)
            })
        axios.get(`http://localhost:8080/api/test/don-hang`)
            .then(res => {
                let temp = 0
                res.data.map(order => (
                    temp += order.dh_tongGia
                ))
                this.setState({ sumDoanhThu: temp })
                this.setState({ sizeDonhang: res.data.length })
            })
            .catch(err => {
                console.log("loi khi get doanh thu theo thang: ", err)
            })
        axios.get(`http://localhost:8080/api/test/san-pham/het-hang`)
            .then(res => {
                this.setState({ sanPhamHetHang: res.data })
            })
            .catch(err => {
                console.log("loi khi get san pham het hang: ", err)
            })
        axios.get(`http://localhost:8080/api/test/nha-cung-cap`)
            .then(res => {
                this.setState({ nhaCungCaps: res.data })
                console.log(res.data)
            })
            .catch(err => {
                console.log("loi khi get nha cung cap: ", err)
            })

    }

    handleClickToRenderSalesReport = (name) => {
        this.setState({ isRender: this.state.isRender + 1 })
        this.setState({ isSelected: name })
    }


    renderSalesReport() {
        if (this.state.isSelected) {
            switch (this.state.isSelected) {
                case 'thang':
                    if (this.state.dataThang.length !== 0) {
                        return <SalesRepostAdmin dataThang={this.state.dataThang} />
                    } else return <LoadingIcon />
                default:
                    return <SalesRepostAdmin dataThang={this.state.dataThang} />
            }
        } else {
            return <LoadingIcon />
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    handleImportProducts = (sanPham) => {
        console.log(sanPham)
        this.setState({
            sanPhamNhap: sanPham
        })
        window.scrollTo(0, document.body.scrollHeight);
    }
    handleSummitForm = e => {
        e.preventDefault();
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const ngayDachuyen = `${day}-${month}-${year}`;
        const dataPost = {
            idNhanVien: 3,
            idNhaCungCap: this.state.nhacungcap,
            ngayNhap: ngayDachuyen,
            dsSanPham: [{
                sanPham: this.state.sanPhamNhap,
                donGia: this.state.giaNhap,
                soLuong: this.state.slNhap
            }]
        }
        axios.post(`http://localhost:8080/api/test/nhap-hang`, dataPost)
            .then(res => {
                console.log(res.data)
                this.setState({
                    sanPhamNhap: null,
                    showThongBao: true,
                    thongbao: 'Nhập hàng thành công'
                })
                this.RerenderProductSoulout()
            })
            .catch(err => {
                console.log("Lỗi khi thêm phiếu nhập tại hoemAdmin: ", err)
            })
        console.log(dataPost)
    }
    closeAlert = () => {
        this.setState({ showThongBao: false, thongbao: '' });
    };
    RerenderProductSoulout() {
        axios.get(`http://localhost:8080/api/test/san-pham/het-hang`)
            .then(res => {
                this.setState({ sanPhamHetHang: res.data })
            })
            .catch(err => {
                console.log("loi khi get san pham het hang: ", err)
            })
    }

    render() {
        const { sizeDonhang, sizeSanPham, sumDoanhThu, sanPhamHetHang, nhaCungCaps, sanPhamNhap, showThongBao, thongbao } = this.state
        const { hinhAnh } = this.props
        return (
            <div className="container-admin" style={{ display: "flex" }}>
                <div className="container-left" style={{ width: 'calc(100%/12*2)' }}><MenuAdmin /></div>
                <div className="container-right" style={{ width: 'calc(100%/12*10)' }}>
                    <div className="content-home-top">
                        <div className="content-top__list">
                            <div className="content-top__item">
                                <div className="content-top__icon"><FontAwesomeIcon icon={faCartShopping} /></div>
                                <div className="content-top__detail">
                                    <h3 className="content-top__title">Đơn hàng</h3>
                                    <p className="content-top__value">{sizeDonhang}</p>
                                </div>
                            </div>
                            <div className="content-top__item">
                                <div className="content-top__icon"><FontAwesomeIcon icon={faLaptop} /></div>
                                <div className="content-top__detail">
                                    <h3 className="content-top__title">Sản phẩm</h3>
                                    <p className="content-top__value">{sizeSanPham}</p>
                                </div>
                            </div>
                            <div className="content-top__item">
                                <div className="content-top__icon"><FontAwesomeIcon icon={faCircleDollarToSlot} /></div>
                                <div className="content-top__detail">
                                    <h3 className="content-top__title">Doanh thu</h3>
                                    <p className="content-top__value">{sumDoanhThu.toLocaleString()} VNĐ</p>
                                </div>
                            </div>
                            <div className="content-top__item">
                                <div className="content-top__icon"><FontAwesomeIcon icon={faLaptop} /></div>
                                <div className="content-top__detail">
                                    <h3 className="content-top__title" style={{ fontSize: '20px' }}>Sản phẩm gần hết</h3>
                                    <p className="content-top__value">{sanPhamHetHang.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-home-main">
                        <div className="content-home-main-nav">
                            <h5 className="content-home-main-nav__title">Thống kê theo tháng: </h5>
                        </div>
                        <div key={this.state.isRender} className="content-home-main-saleReport">
                            {this.renderSalesReport()}
                        </div>
                        <div className="content-home-main-nav">
                            <h5 className="content-home-main-nav__title">Sản phẩm sắp hết hàng: </h5>
                            {showThongBao === true ? <AlertSuccess message={thongbao} closeAlert={this.closeAlert} /> : ''}
                        </div>
                        <div className="content-main__list-table">
                            <table className="content-main__table">
                                <thead>
                                    <tr>
                                        <th className="table-title table-title__img" style={{ width: '10%', textAlign: 'center' }}>Hình ảnh</th>
                                        <th className="table-title table-title__name" style={{ width: '20%', textAlign: 'center' }}>Tên sản phẩm</th>
                                        <th className="table-title table-title__ram" style={{ width: '5%', }}>RAM</th>
                                        <th className="table-title table-title__cpu" style={{ width: '10%', textAlign: 'center' }}>CPU</th>
                                        <th className="table-title table-title__manhinh" style={{ width: '15%', textAlign: 'center' }}>Màn hình</th>
                                        <th className="table-title table-title__card" style={{ width: '10%', textAlign: 'center' }}>Card</th>
                                        <th className="table-title table-title__ocung" style={{ width: '10%', textAlign: 'center' }}>Ổ cứng</th>
                                        <th className="table-title table-title__sl" style={{ width: '10%', textAlign: 'center' }}>Số lượng tồn</th>
                                        <th className="table-title table-title__price" style={{ width: '10%', textAlign: 'center' }}>Giá</th>
                                        <th colSpan={2}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sanPhamHetHang.map((sanPham, index) => (
                                        <tr key={index} className="table-contetn__item">
                                            <td className="table-content">
                                                <div className="table-content__img" style={{ backgroundImage: `url(data:image/jpg;base64,${hinhAnh[sanPham.sp_id]})` }}></div>
                                            </td>
                                            <td className="table-content table-content__name">{sanPham.sp_ten}</td>
                                            <td className="table-content" style={{ textAlign: 'center' }}>{sanPham.sp_ram} GB</td>
                                            <td className="table-content" style={{ textAlign: 'center' }}>{sanPham.sp_cpu}</td>
                                            <td className="table-content table-content__manhinh">{sanPham.sp_manhinh}</td>
                                            <td className="table-content" style={{ textAlign: 'center' }}>{sanPham.sp_card}</td>
                                            <td className="table-content" style={{ textAlign: 'center' }}>{sanPham.sp_ocung}</td>
                                            <td className="table-content" style={{ textAlign: 'center', color: 'red', fontWeight: '600' }}>{sanPham.sp_soluong}</td>
                                            <td className="table-content" style={{ textAlign: 'center' }}>{sanPham.sp_gia.toLocaleString()} VNĐ</td>
                                            <td>
                                                <button onClick={() => this.handleImportProducts(sanPham)} type="button" className="btn btn-primary">Nhập hàng</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {sanPhamNhap !== null ?
                            <div className="form-import">
                                <h5 className="content-home-main-nav__title">Sản phẩm nhập hàng: </h5>
                                <div className="form-import-content">
                                    <div style={{ display: 'flex', alignItems: 'center' }} className="product-name">
                                        <h5 className="content-title">Tên sản phẩm:</h5>
                                        <p className="content-body">{sanPhamNhap.sp_ten}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }} className="product-CPU">
                                        <h5 className="content-title">CPU:</h5>
                                        <p className="content-body">{sanPhamNhap.sp_cpu}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }} className="product-Card">
                                        <h5 className="content-title">Card:</h5>
                                        <p className="content-body">{sanPhamNhap.sp_card}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }} className="product-RAM">
                                        <h5 className="content-title">Dung lượng RAM:</h5>
                                        <p className="content-body">{sanPhamNhap.sp_ram}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }} className="product-ROM">
                                        <h5 className="content-title">Dung lượng ổ cứng:</h5>
                                        <p className="content-body">{sanPhamNhap.sp_ocung}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }} className="product-manhinh">
                                        <h5 className="content-title">Màn hình:</h5>
                                        <p className="content-body">{sanPhamNhap.sp_manhinh}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }} className="product-thuonghieu">
                                        <h5 className="content-title">Thương hiệu:</h5>
                                        <p className="content-body">{sanPhamNhap.thuonghieu.th_ten}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }} className="product-giaban">
                                        <h5 className="content-title">Giá bán:</h5>
                                        <p className="content-body">{sanPhamNhap.sp_gia.toLocaleString()} VNĐ</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }} className="product-soluongton">
                                        <h5 className="content-title">Số lượng còn:</h5>
                                        <p style={{ color: 'red', fontWeight: '600' }} className="content-body">{sanPhamNhap.sp_soluong}</p>
                                    </div>
                                    <form className="formImport" onSubmit={this.handleSummitForm}>
                                        <div>
                                            <label>Nhà cung cấp:</label>
                                            <select
                                                name="nhacungcap"
                                                value={this.state.nhacungcap}
                                                onChange={this.handleChange}
                                            >
                                                <option value="">-- Chọn nhà cung cấp của sản phẩm --</option>
                                                {nhaCungCaps.map(item => (
                                                    <option key={item.ncc_id} value={item.ncc_id}>{item.ncc_ten}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label>Số lượng nhập:</label>
                                            <input
                                                type="number"
                                                name="slNhap"
                                                value={this.state.slNhap}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label>Giá nhập:</label>
                                            <input
                                                type="text"
                                                name="giaNhap"
                                                value={this.state.giaNhap}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <button className="btn btn-primary" type="submit">Nhập hàng</button>
                                    </form>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const layAnhtuStore = state => ({
    hinhAnh: state.hinhAnh
})

export default withCookies(connect(layAnhtuStore)(HomeAdmin));
