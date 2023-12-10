import React, { Component } from 'react';
import './css/Register.css'
import axios from 'axios';
import AlertSuccess from '../components/Alert/AlertSuccess';



class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            birthday: '',
            address: '',
            phoneNumber: '',
            email: '',
            username: '',
            password: '',
            showThongBao: false,
            thongbao: ''
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
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
        const postData = {
            kh_id: 0,
            kh_ten: this.state.fullName,
            kh_namsinh: this.handleDateTime(this.state.birthday),
            kh_sdt: this.state.phoneNumber,
            kh_emial: this.state.email,
            kh_gioitinh: "Nam",
            diaChi: this.state.address,
            userName: this.state.username,
            passWord: this.state.password
        }
        axios.post(`http://localhost:8080/api/test/dang-ky-tai-khoan`, postData)
            .then(res => {
                console.log(res.data)
                this.setState({
                    showThongBao: true,
                    thongbao: 'Tạo tài khoản thành công'
                })
                this.props.history.push("/dang-nhap")
            })
            .catch(err => {
                console.log("Loi khi dang ky tai khoan: ", err)
            })
    };
    closeAlert = () => {
        this.setState({ showThongBao: false, thongbao: '' });
    };

    render() {
        const {showThongBao, thongbao} = this.state
        return (
            <div className='register-wapper'>
                <div className="register-container">
                    <h2 className='register-title'>Đăng Ký</h2>
                    {showThongBao === true? <AlertSuccess message = {thongbao} closeAlert = {this.closeAlert} /> : ''}
                    <div className="register-form">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="fullName">Tên Người Dùng:</label>
                                <input
                                    type="text"
                                    className="form-control register-input"
                                    id="fullName"
                                    name="fullName"
                                    value={this.state.fullName}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="birthday">Năm sinh:</label>
                                <input
                                    type="date"
                                    id="birthday"
                                    name="birthday"
                                    value={this.state.birthday}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Địa Chỉ:</label>
                                <input
                                    type="text"
                                    className="form-control register-input"
                                    id="address"
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Số Điện Thoại:</label>
                                <input
                                    type="text"
                                    className="form-control register-input"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    className="form-control register-input"
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Tên Đăng Nhập:</label>
                                <input
                                    type="text"
                                    className="form-control register-input"
                                    id="username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mật Khẩu:</label>
                                <input
                                    type="password"
                                    className="form-control register-input"
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-register">
                                Đăng Ký
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterForm;
