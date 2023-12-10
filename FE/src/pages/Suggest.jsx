import React, { Component } from "react";
import './css/Suggest.css'
import './css/reposive/suggest.css'
// import axios from "axios";
import SuggestComponent from "../components/Suggest/SuggestComponent";
import axios from "axios";

class Suggest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nhuCau: "",
            hieuNang: "",
            mucGia: "",
            sanPhams: [],
            dacTinh: null
        };
    }

    handleRadioChangeSellected = (chuDe, traLoi) => {
        this.setState({
            [chuDe]: traLoi,
        });
    };
    handleFormSubmit = (e) => {
        e.preventDefault()
        const postData = {
            data: [this.state.nhuCau, this.state.hieuNang, this.state.mucGia]
        }
        console.log(postData)
        axios.post(`http://127.0.0.1:5000`, postData)
            .then(res => {
                console.log(`ket_qua_goi_y: ${res.data.ket_qua[0]}`)
                this.handleGetProductsSuggest(res.data.ket_qua[0])
            })
            .catch(err => {
                console.log("Lôi khi lấy kq gợi ý: ", err)
            })
    }
    handleGetProductsSuggest(idDacTinh) {
        axios.get(`http://localhost:8080/api/test/san-pham/dac-tinh/${idDacTinh}`)
            .then(res => {
                this.setState({ 
                    sanPhams: res.data.listSP,
                    dacTinh: res.data.dacTinh
                 })
            })
            .catch(err => {
                console.log("Loi khi load san pham goi y: ", err)
            })
    }

    render() {
        const { sanPhams, dacTinh } = this.state
        return (
            <div className="suggest-wapper">
                <div className="suggest-container">
                    {
                        sanPhams.length > 0 ?
                            <div id="suggest-products" className="suggest-products">
                                <h4 className="suggest-title">Kết quả sau khi xử lý thông tin:</h4>
                                <div className="mb-1" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <p className="suggest-result-content">
                                        Chúng tôi đề xuất đến bạn dòng Laptop: <span style={{ fontWeight: '600', color: 'red' }}>{dacTinh.dt_ten}</span>
                                    </p>
                                    <button onClick={() =>{
                                        this.setState({sanPhams: []})
                                    }} type="button" className="btn btn-danger">Làm lại</button>
                                </div>
                                <SuggestComponent sanPhams={sanPhams}/>
                            </div>
                            :
                            <div className="suggest-form">
                                <form onSubmit={this.handleFormSubmit}>
                                    <div>
                                        <label className="question-title">1. Bạn sẽ sử dụng laptop cho mục đích gì là chính?</label>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="nhuCau"
                                                    value='1'
                                                    checked={this.state.nhuCau === 1}
                                                    onChange={() => this.handleRadioChangeSellected("nhuCau", 1)}
                                                />
                                                Văn phòng
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="nhuCau"
                                                    value="2"
                                                    checked={this.state.nhuCau === 2}
                                                    onChange={() => this.handleRadioChangeSellected("nhuCau", 2)}
                                                />
                                                Chơi game
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="nhuCau"
                                                    value="3"
                                                    checked={this.state.nhuCau === 3}
                                                    onChange={() => this.handleRadioChangeSellected("nhuCau", 3)}
                                                />
                                                Đồ họa-kỹ thuật
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="question-title">2. Bạn ưu tiên về hiệu năng không?</label>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="hieuNang"
                                                    value="Có"
                                                    checked={this.state.hieuNang === 0}
                                                    onChange={() => this.handleRadioChangeSellected("hieuNang", 0)}
                                                />
                                                Có
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="hieuNang"
                                                    value="Không"
                                                    checked={this.state.hieuNang === 1}
                                                    onChange={() => this.handleRadioChangeSellected("hieuNang", 1)}
                                                />
                                                Không
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="question-title">3. Ngân sách bạn dành cho laptop ở mức nào?</label>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="mucGia"
                                                    value="Thấp"
                                                    checked={this.state.mucGia === 1}
                                                    onChange={() => this.handleRadioChangeSellected("mucGia", 1)}
                                                />
                                                Thấp
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="mucGia"
                                                    value="Trung"
                                                    checked={this.state.mucGia === 2}
                                                    onChange={() => this.handleRadioChangeSellected("mucGia", 2)}
                                                />
                                                Trung
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="mucGia"
                                                    value="Cao cấp"
                                                    checked={this.state.mucGia === 3}
                                                    onChange={() => this.handleRadioChangeSellected("mucGia", 3)}
                                                />
                                                Cao cấp
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary suggest-btn">Gợi ý</button>
                                    <p className="suggest-note">
                                        <span>* Lưu ý</span>:
                                        Tính năng này đang trong quá trình phát triển để hoàn thiện hơn nên hãy
                                        thông cảm cho hệ thống nếu gợi ý không phù hợp với nhu cầu của bạn.
                                    </p>
                                </form>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default Suggest;