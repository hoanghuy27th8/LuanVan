import React, { Component } from "react";
import '../../pages/css/UserInfo.css'

class UserAccount extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: this.props.khachHang.taiKhoan.tk_userName,
            password: this.props.khachHang.taiKhoan.tk_passWord
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        console.log(this.props.khachHang)
        return (
            <div>
                <div className="userinfo-wapper">
                    <div className="userinfo-content">
                        <form className="userinfo-form" onSubmit={this.handleSubmit}>
                            <h1 className="userinfo-title">Tài khoản của tôi</h1>
                            <div className="account-content">
                                
                            </div>
                            <label className="userinfor-title__input">
                                <span>Tài khoản:</span>
                                <input
                                    className="userinfor__input"
                                    type="text"
                                    name="name"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    required
                                />
                            </label>
                            <label className="userinfor-title__input-date">
                                <span style={{ display: 'block' }}>Mật khẩu:</span>
                                <input
                                    className="userinfor__input"
                                    type="text"
                                    name="name"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </label>
                            <button className="userinfo__btnSubmit" type="submit">Lưu</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserAccount;