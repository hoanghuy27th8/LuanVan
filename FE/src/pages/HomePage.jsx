import React, { Component } from "react";
import SideshowComponent from '../components/SideShow/SideshowComponenet';
import KhuyenMaiComponent from '../components/Khuyenmai/KhuyenMaiComponent';
import ProductsHome from '../components/ProductsHome/ProductsHome';
import axios from "axios";
import { withCookies } from "react-cookie";
import { connect } from 'react-redux';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idThuongHieus: [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/test/thuong-hieu")
            .then(res => {
                this.setState({ idThuongHieus: res.data })
            })
            .catch(err => {
                console.log("loi khi lay thuong hieu: ", err)
            })
        axios.get(`http://localhost:8080/api/test/hinh-anh`)
            .then(res => {
                const hinhAnhsRes = res.data;
                const dsAnhs = [];
                hinhAnhsRes.forEach(item => {
                    const idSanPham = item.sanPham.sp_id;
                    const anh = item.ha_data;

                    if (dsAnhs[idSanPham] === undefined) {
                        dsAnhs[idSanPham] = anh;
                    }
                });
                this.props.setHinhAnh(dsAnhs);
            });
    }

    render() {
        const idThuongHieus = this.state.idThuongHieus
        return (
            <div>
                <SideshowComponent />
                <KhuyenMaiComponent anh={this.state.anhs} />
                {idThuongHieus.map(item => (
                    <ProductsHome key={item.th_id} thuonghieu={item} />
                ))}
            </div>
        );
    }
}

const layHinhAnhTuStore = (state) => ({
    hinhAnh: state.hinhAnh,
});

const setGiaTriMoiChoHinhAnh = (dispatch) => ({
    setHinhAnh: (hinhAnh) => dispatch({ type: 'SET_HINHANH', payload: hinhAnh }),
});

export default withCookies(connect(layHinhAnhTuStore, setGiaTriMoiChoHinhAnh)(HomePage));