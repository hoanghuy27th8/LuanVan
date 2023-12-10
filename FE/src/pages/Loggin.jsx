import React, {Component} from "react";
import './css/Loggin.css';
import axios from "axios";
import AlertSuccess from "../components/Alert/AlertSuccess";
import AlertError from "../components/Alert/AlertError";
import { withCookies } from 'react-cookie';

class Loggin extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            nguoidung: '',
            token: '',
            showThongBao: '',
            showThongBaoErr: '',
            thongbao: ''
            
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };


    handleSubmitLogin = e => {
        e.preventDefault()
        const postData = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post(`http://localhost:8080/api/login`, postData)
            .then(res => {
                this.setState({
                    token: res.data.token,
                    nguoidung: res.data.user,
                    showThongBao: true,
                    thongbao: "Đăng nhập thành công"
                })
                console.log(res.data.user)
                const expDay = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
                document.cookie = `token=${res.data.token}; expires=${expDay.toUTCString()}`
                res.data.user.nv_id === undefined? 
                    document.cookie = `User=${res.data.user.kh_id} ; expires=${expDay.toUTCString()}`
                : document.cookie = `User=${res.data.user.nv_id} ; expires=${expDay.toUTCString()}`
                document.cookie = `Role=${res.data.user.taiKhoan.tk_role}; expires=${expDay.toUTCString()}`;
                res.data.user.taiKhoan.tk_role === 'USER' ?
                this.props.history.push('/trang-chu') : this.props.history.push('/admin')
            })
            .catch(err => {
                this.setState({
                    showThongBaoErr: true,
                    thongbao: `Đăng nhập thất bại\nVui lòng kiểm tra lại thông tin vừa nhập`
                })
                console.log(`Loi khi dang nhap: ${err}`)
            })
    }

    closeAlert = () => {
        this.setState({ showThongBao: false, thongbao: '' });
        this.setState({ showThongBaoErr: false, thongbao: '' });
    };

    render() {
        const {showThongBao, showThongBaoErr, thongbao} = this.state
        return (
            <div className="loggin-wapper">
                <div className="loggin-container">
                    <div className="loggin-content" style={{position: 'relative'}}>
                        <h2 className="loggin-title">Đăng nhập</h2>
                        {showThongBao === true? <AlertSuccess message = {thongbao} closeAlert = {this.closeAlert} /> : ''}
                        {showThongBaoErr === true? <AlertError message = {thongbao} closeAlert = {this.closeAlert} /> : ''}
                        <div className="loggin-info">
                            <form onSubmit={this.handleSubmitLogin}>
                                <div className="loggin-info-username">
                                    <label className="loggin-info-name">Tài khoản:</label><br/>
                                    <input onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="Nhập tài khoản" className="loggin-info__input" />
                                </div>
                                <div className="loggin-info-password">
                                    <label className="loggin-info-name">Mật khẩu:</label><br/>
                                    <input onChange={this.handleChange} name="password" value={this.state.password} type="password" placeholder="Nhập mật khẩu" className="loggin-info__input" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-loggin">Đăng nhập</button>
                                <a href="/dang-ky" className="btn btn-success btn-signup">Đăng ký</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withCookies(Loggin);