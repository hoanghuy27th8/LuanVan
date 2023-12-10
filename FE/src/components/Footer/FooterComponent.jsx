import React, {Component} from "react";
import './Footer.css';
import '../../pages/css/reposive/footer.css'
class FooterComponent extends Component{
    render(){
        return (
            <footer id="footer" className="footer-wapper">
                <div className="footer-main">
                    <ul className="footer-main-list">
                        <li className="footer-main-item">
                            <h4>Về chúng tôi</h4>
                            <span>- Website này được tạo ra phục vụ cho đồ án tốt nghiệp</span><br />
                            <span>- Website được thực hiện bởi sinh viên Nguyễn Hoàng Huy B1906677 cùng với sự hỗ trợ của giáo viên hướng dẫn Ths. Võ Huỳnh Trâm được cài đặt học kỳ 1 năm học 2023-2024</span>
                        </li>
                        <li className="footer-main-item">
                            <h4>Thông tin liên hệ</h4>
                            <span>- Địa chỉ: Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ</span><br />
                            <span>- Điện thoại: 0123456789</span><br />
                            <span>- Email về hòm thư: huyb1906677@student.ctu.edu.vn</span>
                        </li>
                        <li className="footer-main-item">
                            <h4>Thanh toán</h4>
                            <span>Thanh toán trực tuyến (Intenet Banking)</span><br/>
                            <span>Thanh toán khi nhận</span>
                        </li>
                    </ul>
                </div>
                <div className="footer-bottom">
                    <p className="footer-bottom-content">Hỗ trợ kỹ thuật: 035.2863.063</p>
                </div>
            </footer>
        );
    }
}

export default FooterComponent;