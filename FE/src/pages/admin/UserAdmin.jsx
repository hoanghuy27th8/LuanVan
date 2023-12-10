import React, { Component } from "react";
import MenuAdmin from "./components/MenuAdmin";
import '../css/admin/UserAdmin.css'
import axios from "axios";
import { parse, format } from 'date-fns';
import AlertSuccess from "../../components/Alert/AlertSuccess";
import AlertError from "../../components/Alert/AlertError"


class UserAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '1',
            fullName: '',
            birthDate: '',
            gender: '',
            email: '',
            phoneNumber: '',
            address: '',
            username: '',
            password: '',
            nhanViens: [],
            showThongBao: false,
            showThongBaoErr: false,
            thongbao:''
        };
    }
    closeAlert = () => {
        this.setState({ showThongBao: false, thongbao: '' });
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };
    authenticationUser() {
        const { cookies } = this.props
        this.setState({ idAdmin: cookies.get('User') })
        if (cookies.get('User') === undefined || cookies.get('Role') !== 'ADMIN') {
            this.props.history.push("/dang-nhap")
        }
    }
    componentDidMount() {
        // this.authenticationUser()
        this.loadAllNhanVien()
    }
    loadAllNhanVien() {
        axios.get(`http://localhost:8080/api/test/nhan-vien`)
            .then(res => {
                this.setState({
                    nhanViens: res.data
                })
            })
            .catch(err => {
                console.log(`Loi khi load all nhan vien: ${err}`)
            })
    }
    hadleClickSua = nhanvien => {
        const paresedDate = parse(nhanvien.nv_namSinh, 'dd-MM-yyyy', new Date())
        const namSinh = format(paresedDate, 'yyyy-MM-dd')
        this.setState({
            id: '1',
            fullName: nhanvien.nv_ten,
            birthDate: namSinh,
            gender: nhanvien.nv_gioiTinh,
            email: nhanvien.nv_email,
            phoneNumber: nhanvien.nv_sdt,
            address: nhanvien.nv_diaChi,
            username: nhanvien.taiKhoan.tk_userName,
            password: '',
        })
    }
    handleDateTime(dateInput) {
        const date = new Date(dateInput)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const ngaysinh = this.handleDateTime(this.state.birthDate)
        const postData = {
            hoTen: this.state.fullName,
            ngaySinh: ngaysinh,
            gioiTinh: this.state.gender,
            SDT: this.state.phoneNumber,
            email: this.state.email,
            diaChi: this.state.address,
            taiKhoan: this.state.username,
            matKhau: this.state.password,
            vaiTro: "ADMIN"
        }
        axios.post(`http://localhost:8080/api/test/nhan-vien`, postData)
            .then(res => {
                this.loadAllNhanVien()
                this.setState({
                    showThongBao: true,
                    thongbao: 'Thêm tài khoản thành công'
                })
                this.cleadState()
            })
            .catch(err => {
                this.setState({
                    showThongBaoErr: true,
                    thongbao: 'Thêm tài khoản thất bại'
                })
            })
    };
    cleadState = e => {
        this.setState({
            id: '1',
            fullName: '',
            birthDate: '',
            gender: '',
            email: '',
            phoneNumber: '',
            address: '',
            username: '',
            password: '',
        })
    }


    render() {
        const { nhanViens, showThongBao, showThongBaoErr, thongbao } = this.state
        return (
            <div className="container-admin" style={{ display: "flex" }}>
                <div className="container-left" style={{ width: 'calc(100%/12*2)' }}><MenuAdmin /></div>
                <div className="container-right" style={{ width: 'calc(100%/12*10)' }}>
                    <div className="content-main">
                        <div className="user-admin__list">
                            <h2 className="content-main__title">Quản trị viên</h2>
                            {showThongBao === true? <AlertSuccess message = {thongbao} closeAlert = {this.closeAlert} /> : ''}
                            {showThongBaoErr === true? <AlertError message = {thongbao} closeAlert = {this.closeAlert} /> : ''}
                            <table className="user-admin__table" style={{ border: '2px solid #ddd' }}>
                                <thead>
                                    <tr>
                                        <td className="content-table__title" style={{ width: '4%' }}>ID</td>
                                        <td className="content-table__title" style={{ width: '15%' }}>Họ và tên</td>
                                        <td className="content-table__title" style={{ width: '10%' }}>Năm sinh</td>
                                        <td className="content-table__title" style={{ width: '10%' }}>Giới tính</td>
                                        <td className="content-table__title" style={{ width: '10%' }}>Email</td>
                                        <td className="content-table__title" style={{ width: '10%' }}>SĐT</td>
                                        <td className="content-table__title" style={{ width: '20%' }}>Địa chỉ</td>
                                        <td className="content-table__title" style={{ width: '20%' }}>Tài khoản</td>
                                        <td style={{ width: '10%' }} colSpan={2}></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nhanViens.map(nhanvien => (
                                        nhanvien.taiKhoan !== null && (
                                            <tr key={nhanvien.nv_id} className="content-table__row">
                                                <td className="content-table__value">{nhanvien.nv_id}</td>
                                                <td className="content-table__value">{nhanvien.nv_ten}</td>
                                                <td className="content-table__value">{nhanvien.nv_namSinh}</td>
                                                <td className="content-table__value">{nhanvien.nv_gioiTinh}</td>
                                                <td className="content-table__value">{nhanvien.nv_email}</td>
                                                <td className="content-table__value">{nhanvien.nv_sdt}</td>
                                                <td className="content-table__value">{nhanvien.nv_diaChi}</td>
                                                <td className="content-table__value">{nhanvien.taiKhoan.tk_userName}</td>
                                                <td><button onClick={e => this.hadleClickSua(nhanvien)} type="button" className="btn btn-primary">Sửa</button></td>
                                                <td><button type="button" className="btn btn-danger">Xóa</button></td>
                                            </tr>
                                        )
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="content-main__form">
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label htmlFor="fullName">Họ Tên:</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={this.state.fullName}
                                        onChange={this.handleChange}
                                        style={{ border: '1px solid #ddd' }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="birthDate">Ngày Sinh:</label>
                                    <input
                                        type="date"
                                        id="birthDate"
                                        name="birthDate"
                                        value={this.state.birthDate}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div style={{ padding: '5px 0' }}>
                                    <label>Giới Tính:</label>
                                    <label style={{ width: `100px` }}>
                                        <input
                                            style={{ width: `10px` }}
                                            className="radio-selecter"
                                            type="radio"
                                            name="gender"
                                            value="Nam"
                                            checked={this.state.gender === 'Nam'}
                                            onChange={this.handleChange}
                                        />
                                        Nam
                                    </label>
                                    <label>
                                        <input
                                            style={{ width: `10px` }}
                                            className="radio-selecter"
                                            type="radio"
                                            name="gender"
                                            value="Nữ"
                                            checked={this.state.gender === 'Nữ'}
                                            onChange={this.handleChange}
                                        />
                                        Nữ
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber">Số Điện Thoại:</label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={this.state.phoneNumber}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address">Địa Chỉ:</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username">Tài Khoản:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Mật Khẩu:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <button className="btn-submit-formAddUser" type="submit">Thêm tài khoản</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserAdmin;