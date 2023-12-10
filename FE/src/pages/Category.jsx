import React, { Component } from "react";
import './css/Category.css';
import './css/reposive/category.css'
import CategoryProduct from "../components/CategoryListProduct/CategoryProduct";
import axios from "axios";


class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenThuongHieu: this.props.location.state.tenThuongHieu,
            idThuongHieu: this.props.location.state.idThuongHieu,
            thuongHieus: [],
            sanPhams: [],
            loadCategoryProduct: 1
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/api/test/thuong-hieu`)
            .then(res => {
                this.setState({ thuongHieus: res.data })
            })
            .catch(err => {
                console.log("loi load thuong hieu o Category: ", err)
            })
        this.handleClickThuongHieu(this.state.tenThuongHieu, this.state.idThuongHieu)
    }
    handleClickThuongHieu = (item, id) => {
        axios.get(`http://localhost:8080/api/test/san-pham/thuong-hieu/${id}`)
            .then(res => {
                this.setState({
                    tenThuongHieu: item,
                    idThuongHieu: id,
                    sanPhams: res.data,
                    loadCategoryProduct: this.state.loadCategoryProduct + 1,
                })
            })
            .catch(err => {
                console.log("Loi o category click thuong hieu: ",err)
            })
        // if (item) {
            // this.setState({
                // tenThuongHieu: item,
                // idThuongHieu: id,
                // loadCategoryProduct: this.state.loadCategoryProduct + 1,
            // });
        // }
    }
    handleClickGiaSanPham = (min, max, name) => {
        axios.get(`http://localhost:8080/api/test/san-pham/gia?minPrice=${min}&&maxPrice=${max}`)
            .then(res => {
                this.setState({
                    sanPhams: res.data,
                    loadCategoryProduct: this.state.loadCategoryProduct + 1,
                    tenThuongHieu: `Giá từ ${name}`
                })
            })
            .catch(err => {
                console.log("loi o category click gia: ",err)
            })
    }

    render() {
        const thuongHieus = this.state.thuongHieus
        const tenThuongHieu = this.state.tenThuongHieu
        const idThuongHieu = this.state.idThuongHieu
        const chuoiCat = tenThuongHieu.split("Giá từ ")[1]
        console.log(idThuongHieu, tenThuongHieu)
        return (
            <div className="category-wapper">
                <div className="category-top">
                    <h1 className="category-top-name">Danh mục sản phẩm:</h1>
                    <h1 className="category-top-name">{this.state.tenThuongHieu}</h1>
                </div>
                <div className="category-container">
                    <div className="category-left">
                        <div className="filter-list">
                            <div className="filter-item">
                                <h4 className="filter-item__title">Thương hiệu</h4>
                                <ul className="filter-item__name">
                                    {thuongHieus.map(item => (
                                        <li key={item.th_id} className="filter-item__link">
                                            <a href={`/danh-muc/${tenThuongHieu}`} className={`${item.th_ten === tenThuongHieu ? 'active-filter' : ''}`} onClick={(e) => { e.preventDefault(); this.handleClickThuongHieu(item.th_ten, item.th_id) }}>{item.th_ten}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="filter-item">
                                <h4 className="filter-item__title">Tính năng</h4>
                                <ul className="filter-item__name">
                                    <li className="filter-item__link"><a href="/">Học tập - Văn Phòng</a></li>
                                    <li className="filter-item__link"><a href="/">Đồ họa - Kỹ thuật</a></li>
                                    <li className="filter-item__link"><a href="/">Gaming</a></li>
                                    <li className="filter-item__link"><a href="/">Cao cấp - Sang trọng</a></li>
                                </ul>
                            </div>
                            <div className="filter-item">
                                <h4 className="filter-item__title">Giá</h4>
                                <ul className="filter-item__name">
                                    <li onClick={(e) => { e.preventDefault(); this.handleClickGiaSanPham(0, 10000000, e.target.textContent); }} className={`filter-item__link ${chuoiCat && chuoiCat.includes("Dưới 10 triệu") ? "active-filter2" : ""}`}><a href="/">Dưới 10 triệu</a></li>
                                    <li onClick={(e) => { e.preventDefault(); this.handleClickGiaSanPham(10000000, 15000000, e.target.textContent); }} className={`filter-item__link ${chuoiCat && chuoiCat.includes("10 - 15 triệu") ? "active-filter2" : ""}`}><a href="/">10 - 15 triệu</a></li>
                                    <li onClick={(e) => { e.preventDefault(); this.handleClickGiaSanPham(15000000, 20000000, e.target.textContent); }} className={`filter-item__link ${chuoiCat && chuoiCat.includes("15 - 20 triệu") ? "active-filter2" : ""}`}><a href="/">15 - 20 triệu</a></li>
                                    <li onClick={(e) => { e.preventDefault(); this.handleClickGiaSanPham(20000000, 25000000, e.target.textContent); }} className={`filter-item__link ${chuoiCat && chuoiCat.includes("20 - 25 triệu") ? "active-filter2" : ""}`}><a href="/">20 - 25 triệu</a></li>
                                    <li onClick={(e) => { e.preventDefault(); this.handleClickGiaSanPham(25000000, 30000000, e.target.textContent); }} className={`filter-item__link ${chuoiCat && chuoiCat.includes("25 - 30 triệu") ? "active-filter2" : ""}`}><a href="/">25 - 30 triệu</a></li>
                                    <li onClick={(e) => { e.preventDefault(); this.handleClickGiaSanPham(30000000, 300000000, e.target.textContent); }} className={`filter-item__link ${chuoiCat && chuoiCat.includes("Trên 30 triệu") ? "active-filter2" : ""}`}><a href="/">Trên 30 triệu</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="category-right">
                        <CategoryProduct
                            key={this.state.loadCategoryProduct} // Sử dụng loadCategoryProduct làm key
                            sanPhams = {this.state.sanPhams}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;