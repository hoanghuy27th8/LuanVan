import React, { Component } from "react";
import logomain from "../../../loggo.png";
import '../../css/admin/MenuAdmin.css'
import { Link } from 'react-router-dom';


class MenuAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelected: '',
        }
    }
    handleClickToAddActive = (name) => {
        this.setState({ isSelected: name })
    }

    render() {
        return (
            <div className="menu-wapper">
                <div className="menu-content">
                    <div className="menu-header">
                        <Link to={`/trang-chu`} className="menu-header__logo" style={{ backgroundImage: `url(${logomain})`, display: 'block' }}> </Link>
                    </div>
                    <div className="menu-list">
                        <div className={`menu-item ${this.state.isSelected === 'trang-chu' ? 'active-admin' : ''}`}>
                            <Link to={{pathname: `/admin`}} className="menu-item__link" onClick={() => { this.handleClickToAddActive('trang-chu') }}>Trang chủ</Link>
                        </div>
                        <div className={`menu-item ${this.state.isSelected === 'san-pham' ? 'active-admin' : ''}`}>
                            <Link to={`/admin/san-pham`} className="menu-item__link" onClick={() => { this.handleClickToAddActive('san-pham') }}>Sản phẩm</Link>
                        </div>
                        <div className={`menu-item ${this.state.isSelected === 'khuyen-mai' ? 'active-admin' : ''}`}>
                            <Link to={`/admin/khuyen-mai`} className="menu-item__link" onClick={() => { this.handleClickToAddActive('khuyen-mai') }}>Khuyến mãi</Link>
                        </div>
                        <div className={`menu-item ${this.state.isSelected === 'tai-khoan' ? 'active-admin' : ''}`}>
                            <Link to={`/admin/tai-khoan`} className="menu-item__link" onClick={() => { this.handleClickToAddActive('tai-khoan') }}>Tài khoản</Link>
                        </div>
                        <div className={`menu-item ${this.state.isSelected === 'don-hang' ? 'active-admin' : ''}`}>
                            <Link to={`/admin/don-hang`} className="menu-item__link" onClick={() => { this.handleClickToAddActive('don-hang') }}>Đơn hàng</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MenuAdmin;