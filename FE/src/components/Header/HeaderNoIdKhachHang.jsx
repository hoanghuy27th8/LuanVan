import React, { Component } from "react";
import "./Header.css";
import '../../pages/css/reposive/header.css'
import logomain from "../../loggo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class HeaderNoIdKhachHang extends Component {
    render() {
        return (
            <header id="header">
                <div className="herder-top">
                    <p className="herder-top-content">Địa chỉ: Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ</p>
                </div>
                <div className="header-wrapper">
                    <div className="header-main">
                        <div onClick={this.showBarsLeft} className="header-tb-left">
                            <FontAwesomeIcon icon={faBars} />
                            <div className="header-tb-left__model header-mb-left__model">
                                <ul className="header-bottom-list">
                                    <li onClick={this.closeBars} className="bars-icon__close">
                                        <FontAwesomeIcon icon={faXmark} />
                                    </li>
                                    <li className="header-bottom-item">
                                        <form action="/" method="POST">
                                            <input className="header-bottom-item-serach" type="text" placeholder="Tìm kiếm..." />
                                            <button className="header-bottom-item-button">
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </button>
                                        </form>
                                    </li>
                                    <li className="header-bottom-item">
                                        <a href="/trang-chu" className="header-bottom-item-link">Trang chủ</a>
                                    </li>
                                    <li className="header-bottom-item">
                                        <a href="/" className="header-bottom-item-link">Giới thiệu</a>
                                    </li>
                                    <li className="header-bottom-item">
                                        <a href="/" className="header-bottom-item-link">Đang giảm giá</a>
                                    </li>
                                    <li className="header-bottom-item">
                                        <a href="/goi-y" className="header-bottom-item-link">Gợi ý</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="header-logo">
                            <a href="/trang-chu">
                                <img src={logomain} alt="logo của trang web" />
                            </a>
                        </div>
                        <div className="header-mb-right">
                            <a href="/gio-hang" className="header-tb-right__icon">
                                <FontAwesomeIcon icon={faCartShopping} />
                            </a>
                        </div>
                        <ul className="header-main-nav-list">
                            <li className="header-main-nav-item">
                                <div className="header-main-nav-item-icon">
                                    <FontAwesomeIcon icon={faEarthAsia} />
                                </div>
                                <p>
                                    <span>Hỏi đáp</span>
                                    <br />
                                    <span className="header-main-nav-item-content2">Tư vấn trực tuyến</span>
                                </p>
                            </li>
                            <li className="header-main-nav-item">
                                <div className="header-main-nav-item-icon">
                                    <FontAwesomeIcon icon={faHeadphones} />
                                </div>
                                <p>
                                    <span>Tổng đài</span>
                                    <br />
                                    <span className="header-main-nav-item-content2">0352.863062</span>
                                </p>
                            </li>
                            <li className="header-main-nav-item">
                                <div className="header-main-nav-item-icon">
                                    <FontAwesomeIcon icon={faClock} />
                                </div>
                                <p>
                                    <span>Giờ làm việc</span>
                                    <br />
                                    <span className="header-main-nav-item-content2">8:30-21:00</span>
                                </p>
                            </li>
                            <li className="header-main-nav-item">
                                <div className="header-account__link">
                                    <a href="/dang-nhap" className="header-Noaccount-item">
                                        <FontAwesomeIcon icon={faUser} />
                                    </a>
                                    <div className="header-account-item">
                                        <span style={{color:'red'}}>Khách vãn lai</span>
                                        <div className="header-account-dropdown-list">
                                            <div className="header-account-dropdown-item">
                                                <a href="/dang-nhap" className="header-account-dropdown-item__link">Cập nhật thông tin</a>
                                            </div>
                                            <div className="header-account-dropdown-item">
                                                <Link to={`/dang-nhap`} className="header-account-dropdown-item__link">Lịch sử mua hàng</Link>
                                            </div>
                                            <div className="header-account-dropdown-item">
                                                <a href="/dang-nhap" className="header-account-dropdown-item__link">Đăng nhập</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="header-cart">
                                    <p className="header-cart-name">Giỏ hàng</p>
                                    <a href="/dang-nhap" className="header-cart-icon">
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </a>
                                    <span className="cart-quantity">{0}</span>
                                    <ul className="header-cart-dropdown-list">
                                        <li className="header-cart-dropdown-item">
                                            <div className="header-cart-shopping-content">
                                                <ul className="header-cart-shopping-list">
                                                    {/* {productInCard.chiTietGioHang.map((item, index) => (
                                                        <li key={index} className="header-cart-shopping-item">
                                                            <div className="header-cart-shopping-item-img">
                                                                <div className="image-mini-product" style={{ backgroundImage: `url(data:image/jpg;base64,${hinhAnh[item.sanPham.sp_id]})` }} />
                                                            </div>
                                                            <div className="header-cart-shopping-item-content">
                                                                <div className="header-cart-shopping-item-title">
                                                                    <Link to={`/san-pham/${item.sanPham.sp_id}`}>{item.sanPham.sp_ten}</Link>
                                                                    <div className="header-cart-shopping-item-quantitycost">
                                                                        <span className="header-cart-shopping-item-quantity">{item.ctgh_soLuong}</span>
                                                                        x
                                                                        {item.sanPham.khuyenMai !== null ?
                                                                            <span className="header-cart-shopping-item-title-cost">{(item.sanPham.sp_gia * (100 - item.sanPham.khuyenMai.gg_mucgiamgia) / 100).toLocaleString()} đ</span>
                                                                            :
                                                                            <span className="header-cart-shopping-item-title-cost">{item.sanPham.sp_gia.toLocaleString()} đ</span>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <a href="/" className="header-cart-shopping-item-remove">
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </a>
                                                        </li>
                                                    ))} */}
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="header-cart-dropdown-item">
                                            <p className="header-cart-dropdown-item-sumCost">
                                                Tạm tính: <span>{0}đ</span>
                                            </p>
                                        </li>
                                        <li className="header-cart-dropdown-item">
                                            {/* <a href="/gio-hang" className="header-cart-dropdown-item-link">
                                                Xem giỏ hàng
                                            </a> */}
                                        </li>
                                        {/* <li className="header-cart-dropdown-item">
                                            <a href="/thanh-toan" className="header-cart-dropdown-item-link">
                                                Thanh toán
                                            </a>
                                        </li> */}
                                    </ul>
                                </div>


                            </li>
                        </ul>
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="header-wrapper">
                        <ul className="header-bottom-list">
                            <li className="header-bottom-item">
                                <a href="/trang-chu" className="header-bottom-item-link">Trang chủ</a>
                            </li>
                            <li className="header-bottom-item">
                                <a href="/" className="header-bottom-item-link">Giới thiệu</a>
                            </li>
                            <li className="header-bottom-item">
                                <a href="/khuyen-mai" className="header-bottom-item-link">Đang giảm giá</a>
                            </li>
                            <li className="header-bottom-item">
                                <a href="/goi-y" className="header-bottom-item-link">Gợi ý</a>
                            </li>
                            <li className="header-bottom-item">
                                <form action={`/search`} method="get">
                                    <input className="header-bottom-item-serach"
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                        name="value"
                                    // value={this.state.valueInput}
                                    // onChange={this.handleInputChage}
                                    />
                                    {/* <button onClick={this.handleSearch} className="header-bottom-item-button">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </button> */}
                                    <button className="header-bottom-item-button">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

export default HeaderNoIdKhachHang