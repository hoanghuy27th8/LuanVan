import React, { Component } from "react";
import './css/UserInfo.css';
import './css/reposive/userinfo.css'
import axios from "axios";


class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // khachHang: this.props.khachHang,
            name: this.props.khachHang.kh_ten,
            date: this.props.khachHang.kh_namsinh,
            gender: this.props.khachHang.kh_gioitinh,
            phoneNumber: this.props.khachHang.kh_sdt,
            email: this.props.khachHang.kh_emial,
        };
    }
    // Xử lý sự kiện khi có sự thay đổi trường input
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };
    handleDateTime(dateInput) {
        const date = new Date(dateInput)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    }

    // Xử lý sự kiện khi form được submit
    handleSubmit = (event) => {
        event.preventDefault();
        const dataPut = {
            kh_id: this.props.khachHang.kh_id,
            kh_ten: this.state.name,
            kh_namsinh: this.handleDateTime(this.state.date),
            kh_sdt: this.state.phoneNumber,
            kh_emial: this.state.email,
            kh_gioitinh: this.state.gender
        }
        // console.log(dataPut)
        axios.put(`http://localhost:8080/api/test/cap-nhat-thong-tin/${this.props.khachHang.kh_id}`, dataPut)
            .then(res => {
                if(res.status === 200){
                    alert("Cập nhật thành công cho khách hàng")
                }
            })
            .catch(err => {
                console.log('loi o UserInfo put: ',err)
            })
        // console.log(this.state);
    };



    render() {
        return (
            <div className="userinfo-wapper">
                <div className="userinfo-content">
                    <form className="userinfo-form" onSubmit={this.handleSubmit}>
                        <h1 className="userinfo-title">Hồ sơ của tôi</h1>
                        <label className="userinfor-title__input">
                            <span>Họ tên:</span>
                            <input
                                className="userinfor__input"
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                required
                            />
                        </label>
                        <label className="userinfor-title__input-date">
                            <span style={{ display: 'block' }}>Ngày Sinh:</span>
                            <input
                                style={{ flex: '5' }}
                                className="userinfor__input"
                                type="date"
                                name="date"
                                value={this.state.date}
                                onChange={this.handleChange}
                                required
                            />
                        </label>
                        <br />

                        <label className="userinfor-title__input">
                            <span>Giới tính:</span>
                            <select className="input-gender" name="gender" value={this.state.gender} onChange={this.handleChange} required>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </label>
                        <br />

                        <label className="userinfor-title__input">
                            <span>Số điện thoại:</span>
                            <input
                                className="userinfor__input"
                                type="tel"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.handleChange}
                                required
                            />
                        </label>
                        <br />

                        <label className="userinfor-title__input">
                            <span>Email:</span>
                            <input
                                className="userinfor__input"
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                required
                            />
                        </label>
                        <br />
                        <button className="userinfo__btnSubmit" type="submit">Lưu</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UserInfo;