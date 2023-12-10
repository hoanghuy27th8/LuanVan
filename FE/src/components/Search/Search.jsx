import axios from "axios";
import React, { Component } from "react";
import CategoryProduct from "../CategoryListProduct/CategoryProduct";
import './Search.css'
import LoadingIcon from "../Loading/Loading";

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sanPhams: [],
            valueInput: ''
        }
    }
    componentDidMount() {
        const URL = new URLSearchParams(window.location.search)
        const value = URL.get("value")
        this.setState({ valueInput: value })
        axios.get(`http://localhost:8080/api/test/search?name=${value}`)
            .then(res => {
                this.setState({ sanPhams: res.data })
                console.log(this.state.sanPhams)
            })
            .catch(err => {
                console.log("loi khi lay san pham o search: ", err)
            })
    }

    render() {
        const sanPhams = this.state.sanPhams
        const valueSearch = this.state.valueInput
        console.log(sanPhams)
        return (
            <div className="search-wapper">
                {sanPhams.length > 0 ?
                    <div>
                        <div className="search-content-top">
                            <h2 className="search-title">Từ khóa được tìm kiếm "<span style={{ color: '#1E73BE' }}>{valueSearch}</span>"</h2>
                            <h2 className="results">Tìm thấy <span style={{ color: 'red' }}>{sanPhams.length}</span> sản phẩm</h2>
                        </div>
                        {sanPhams.length > 0 ? <CategoryProduct sanPhams={this.state.sanPhams} />
                            : <LoadingIcon />
                        }
                    </div>
                :
                    <div>
                        <div className="search-content-top">
                            <h2 className="search-title">Từ khóa được tìm kiếm "<span style={{ color: '#1E73BE' }}>{valueSearch}</span>"</h2>
                            <h2 className="results">Tìm thấy <span style={{ color: 'red' }}>{sanPhams.length}</span> sản phẩm</h2>
                        </div>
                        <div className="img-wapper-notfind">
                            <h5 className="content-notfind">
                                Không tìm thấy sản phẩm với từ khóa: <span style={{fontWeight: 600}}>{valueSearch}</span>
                            </h5>
                            <img className="img-notfindproduct" src="./NotFindProduct.jpg" alt="" />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Search