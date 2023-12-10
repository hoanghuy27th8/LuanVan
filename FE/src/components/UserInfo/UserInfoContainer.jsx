import React, { Component } from "react";
import './UserInfoContainer.css';
import UserInfo from '../../pages/UserInfo'
import UserAddress from "./UserAddress";
// import UserAccount from "./UserAccount";
import axios from "axios";
import { parse, format } from 'date-fns';
import LoadingIcon from '../Loading/Loading'
import { withCookies } from "react-cookie";


class UserInfoContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'info',
            idUser: '',
            khachHang: ''
        }
    }
    componentDidMount() {
        const {cookies} =  this.props
        this.setState({idUser: cookies.get('User')})
        axios.get(`http://localhost:8080/api/test/thong-tin/${cookies.get('User')}`)
            .then(res => {
                const paresedDate = parse(res.data.kh_namsinh, 'dd-MM-yyyy', new Date())
                res.data.kh_namsinh = format(paresedDate, 'yyyy-MM-dd')
                this.setState({ khachHang: res.data })
            })
            .catch(err => {
                console.log("loi o UserInfoContainer: ", err)
            })
    }

    handleClickToRender = (name) => {
        this.setState({ selected: name })
    }
    renderComponentUser() {
        if (this.state.khachHang) {
            switch (this.state.selected) {
                case 'info':
                    return <UserInfo khachHang={this.state.khachHang} />;
                case 'address':
                    return <UserAddress khachHang={this.state.khachHang} />;
                // case 'account':
                //     return <UserAccount khachHang={this.state.khachHang} />;
                default:
                    return <UserInfo khachHang={this.state.khachHang} />;
            }
        } else {
            return <LoadingIcon/>;
        }
    }


    render() {
        return (
            <div className="userInfo-wapper">
                <div className="userInfo-container">
                    <div className="userInfo-nav">
                        <div className="userInfor-title">Thông tin của tôi</div>
                        <div onClick={() => this.handleClickToRender('info')} className={`userInfo-nav-item ${this.state.selected === 'info' ? 'active' : ''}`}>Hồ sơ</div>
                        <div onClick={() => this.handleClickToRender('address')} className={`userInfo-nav-item ${this.state.selected === 'address' ? 'active' : ''}`}>Địa chỉ</div>
                        {/* <div onClick={() => this.handleClickToRender('account')} className={`userInfo-nav-item ${this.state.selected === 'account' ? 'active' : ''}`}>Tài khoản</div> */}
                    </div>
                    <div className="userInfo-content">
                        {this.renderComponentUser()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withCookies(UserInfoContainer)