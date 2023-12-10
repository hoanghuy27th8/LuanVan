import React, {Component} from "react";
import './css/Comment.css';
import './css/reposive/comment.css'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faStar} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";


class Comment extends Component {
    constructor(props){
        super(props)
        this.state = {
            product: this.props.location.state.product,
            hinhAnh: this.props.location.state.hinhAnh,
            comments: this.props.location.state.comments
        }
    }
    componentDidMount(){
        axios.get(`http://localhost:8080/api/test/danh-gia/san-pham/${this.props.match.params.sanphamID}`)
            .then(res=> {
                this.setState({comments: res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render(){
        const nameProduct = this.state.product.sp_ten
        const hinhAnh = this.state.hinhAnh
        const comments = this.state.comments
        return(
            <div className="comment-wapper">
                <div className="comment-contents">
                    <h1 className="comment-name-product">{nameProduct}</h1>
                    <div className="comment-content row">
                        <div className="comment-content__img col-6" style={{backgroundImage: `url(data:image/jpg;base64,${hinhAnh})`, margin: '0 auto'}}></div> 
                    </div>
                    <div className="comment-content__list">
                        {comments.length === 0? (<div style={{textAlign: 'center'}}>Hiện chưa có đánh giá về sản phẩm này</div>)
                        : 
                        <div>
                            {comments.map((comment, key) => (
                                <div key={key} className="comment-content__item">
                                    <h2 className="comment-content__name">{comment.donHang.khachHang.kh_ten}</h2>
                                    <div className="comment-content__item-rank">
                                        <h6 className="comment-date">Ngày đánh giá: {comment.dg_ngayDanhGia}</h6>
                                    </div>
                                    <p className="comment-content__item-content">{comment.dg_noiDung}</p>
                                </div>
                            ))}
                        </div>
                        } 
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;