import React, { Component } from "react";
import './css/Thanks.css'
import anhCheck from '../check.png'
import unCheck from '../uncheck.png'

class Thanks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            responseStatus: null,
            data : this.props.order
        }
    }
    componentDidMount() {
        const currentURL = window.location.search
        const searchParams = new URLSearchParams(currentURL)
        const status = searchParams.get("vnp_ResponseCode")
        this.setState({ responseStatus: status })
        console.log(this.state.data)
    }
    handleGoHistory(){
        window.location.href = "/lich-su-mua-hang"
    }
    handleGoToCart(){
        window.location.href = "/gio-hang"
    }
    render() {
        const responseStatus = this.state
        console.log(responseStatus.responseStatus)
        return (
            <div className="thank-wapper">
                <div className="thank-container">
                    {responseStatus.responseStatus === "00" ? (
                        <div className="thank-success">
                            <img src={anhCheck} alt="" className="thank-icon" />
                            <h2 className="thank-status">Đặt hàng thành công</h2>
                            <h4 className="thank-title">Đơn hàng của quý khách đã thanh toán thành công, chúng tôi sẽ sớm xử lý và vận chuyển đến bạn</h4>
                            <button onClick={this.handleGoHistory} type="button" className="btn btn-success thank-btn">Xem lịch sử mua hàng</button>
                        </div>
                    ) :
                        (<div className="thank-success">
                            <img src={unCheck} alt="" className="thank-icon" />
                            <h2 className="thank-status">Đặt hàng không thành công</h2>
                            <h4 className="thank-title">Thanh toán thất bại vui lòng kiểm tra lại !</h4>
                            <button onClick={this.handleGoToCart} type="button" className="btn btn-danger thank-btn">Xem lịch sử mua hàng</button>
                        </div>)
                    }
                </div>
            </div>
        );
    }
}

export default Thanks