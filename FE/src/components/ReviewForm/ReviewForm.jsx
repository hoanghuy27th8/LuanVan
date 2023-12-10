import React, { Component } from "react";
import './ReviewForm.css'
import axios from "axios";

class ReviewForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idDonHang: this.props.idDonHang,
            idSanPham: this.props.idSanPham,
            contentReview: "",
            dateCurrent: ''
        }
    }
    handleGetContentReview(noidung) {
        this.setState({ contentReview: noidung })
    }
    handleSubmitFormReview = (e) => {
        e.preventDefault()
        console.log(this.state)
        const postData = {
            noiDung: this.state.contentReview,
            ngayDanhGia: this.state.dateCurrent
        }
        axios.post(`http://localhost:8080/api/test/danh-gia/don-hang/${this.state.idDonHang}/san-pham/${this.state.idSanPham}`, postData)
            .then(res => {
                console.log(res.data)
                alert(`Danh gia thanh cong cho:\ndon hang: ${this.state.idDonHang} \nsan pham: ${this.state.idSanPham}`)
                const form = document.querySelector('#form_review')
                form.style.display = 'none'
            })
            .catch(err => {
                console.log("loi khi post danh gia o reviewForm: ", err)
            })
    }
    componentDidMount() {
        const date = new Date()
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const DayNoRefactor = `${day}-${month}-${year}`
        this.setState({ dateCurrent: DayNoRefactor })

    }

    render() {
        return (
            <div id="form_review" style={{ margin: '5px 0' }}>
                <form>
                    <textarea onChange={(e) => this.handleGetContentReview(e.target.value)} id="content" className="inputReview" placeholder="Nhập ghi chú tại đây"></textarea>
                    <button onClick={this.handleSubmitFormReview} type="submit" className="btn btn-primary btn-submitReview">Gửi đánh giá</button>
                </form>
            </div>
        );
    }
}

export default ReviewForm