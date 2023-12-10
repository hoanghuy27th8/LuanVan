import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './UserAddress.css'
import axios from "axios";

class UserAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: this.props.khachHang.kh_ten,
            phoneNumber: this.props.khachHang.kh_sdt,
            address: '',
            addressed: this.props.khachHang.diaChiKhachHangs,
        };
    }
    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            kh_id: this.props.khachHang.kh_id,
            kh_ten: this.props.khachHang.kh_ten,
            kh_namsinh: this.props.khachHang.kh_namsinh,
            kh_sdt: this.props.khachHang.kh_sdt,
            kh_emial: this.props.khachHang.kh_emial,
            kh_gioitinh: this.props.khachHang.kh_gioitinh,
            diaChi: this.state.address
        }
        axios.post(`http://localhost:8080/api/test/thong-tin/dia-chi`,postData)
            .then(res => {
                console.log(res.data)
                this.setState({addressed: res.data.diaChiKhachHangs})
                alert("Thêm địa chỉ thành công")
            })
            .catch(err  => {
                console.log("loi tai UserAddress post: ",err)
            })
    }
    handleRemoveAdress = (id) =>{
        const idKhachHang = this.props.khachHang.kh_id
        axios.delete(`http://localhost:8080/api/test/thong-tin/${idKhachHang}/dia-chi/${id}`)
            .then(res => {
                console.log(res.data)
                this.setState({addressed: res.data.diaChiKhachHangs})
                alert("Xóa thành công địa chỉ có id: ", id)
            })
            .catch(err => {
                console.log("Lỗi khi xóa địa chỉ ở UserAddress: ", err)
            })
    }

    render() {
        const { fullName, phoneNumber, address, addressed } = this.state;
        return (
            <div>
                <div className="userAddress-container">
                    <div className="userAddress-top">
                        <h3 className="userAddress-title">Địa chỉ của tôi</h3>
                        <button type="button" className="btn btn-primary btn-add-address" data-toggle="modal" data-target="#addressForm">
                            <FontAwesomeIcon icon={faPlus} style={{ margin: '0 5px' }} />
                            Thêm địa chỉ mới
                        </button>
                        {/* Modal form thêm địa chỉ mới */}
                        <div className="modal fade" id="addressForm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Địa chỉ mới</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="info-top">
                                                <div>
                                                    <input
                                                        className="input-address-value"
                                                        type="text"
                                                        id="fullName"
                                                        name="fullName"
                                                        value={fullName}
                                                        onChange={this.handleInputChange}
                                                        placeholder="Họ và tên"
                                                        disabled
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        className="input-address-value"
                                                        type="tel"
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        value={phoneNumber}
                                                        onChange={this.handleInputChange}
                                                        placeholder="Số điện toại"
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="address">Địa chỉ:</label>
                                                <textarea
                                                    className="input-address-value"
                                                    id="address"
                                                    name="address"
                                                    value={address}
                                                    onChange={this.handleInputChange}
                                                />
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <button type="submit" className="btn btn-primary btn-address">Lưu</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="userAddress-main">
                        <h5 className="userAddress-main-title">Địa chỉ</h5>
                        <div className="userAddress-list">
                            {addressed.map((item, index) => (
                                <div key={index} className="userAddress-item" style={{ display: 'flex' }}>
                                    <div className="userAddress-item-left">
                                        <div className="userAddress-item-address">
                                            <p className="userAddress-item-addres-content" style={{ color: '#000' }}>{index + 1}: {item.dchk_tenDiaChi}</p>
                                        </div>
                                    </div>
                                    <div className="userAddress-item-right">
                                        <button onClick={() => this.handleRemoveAdress(item.dckh_id)} type="button" className="btn btn-danger">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserAddress;