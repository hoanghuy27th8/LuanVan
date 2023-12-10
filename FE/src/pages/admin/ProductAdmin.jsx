import React, { Component } from "react";
import MenuAdmin from "./components/MenuAdmin";
import '../css/admin/ProductAdmin.css'
import axios from "axios";
import LoadingIcon from "../../components/Loading/Loading";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";
// import { faLeaf } from "@fortawesome/free-solid-svg-icons";

class ProductAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sanPhams: [],
            thuongHieus: [],
            anhPost: [],
            tenSanPham: "",
            ram: "",
            cpu: "",
            kichThuocManHinh: "",
            oCung: "",
            cardDoHoa: "",
            moTaChiTiet: "",
            giaBan: "",
            soluong: '',
            thuonghieu: '',
            dacTinhs: [],
            idSanPhamLast: '',
            idSanPhamUpdate: null,
            khuyenMais: [],
            khuyenmai: '',
            isUpdate: 0,
        };
    }
    cleadState() {
        this.setState({
            tenSanPham: "",
            ram: "",
            cpu: "",
            kichThuocManHinh: "",
            oCung: "",
            cardDoHoa: "",
            moTaChiTiet: "",
            giaBan: "",
            soluong: '',
            thuonghieu: '',
            dacTinhs: [],
            idSanPhamUpdate: null,
            khuyenmai: '',
            isUpdate: 0,
        });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    handleChangeUpdate = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            sanPhamUpdate: { ...prevState.sanPhamUpdate, [name]: value }
        }))
    }
    handleCheckDactinh = e => {
        const selectDacTinh = parseInt(e.target.value)
        const { dacTinhs } = this.state
        if (dacTinhs.includes(selectDacTinh)) {
            this.setState({
                dacTinhs: dacTinhs.filter((dactinh) => dactinh !== selectDacTinh)
            })
        } else {
            this.setState({
                dacTinhs: [...dacTinhs, selectDacTinh]
            })
        }
    }
    authenticationUser() {
        const { cookies } = this.props
        this.setState({ idAdmin: cookies.get('User') })
        if (cookies.get('User') === undefined || cookies.get('Role') !== 'ADMIN') {
            this.props.history.push("/dang-nhap")
        }
    }
    componentDidMount() {
        // this.authenticationUser()
        axios.get(`http://localhost:8080/api/test/san-pham`)
            .then(res => {
                this.setState({ sanPhams: res.data })
                this.setState({ idSanPhamLast: res.data[res.data.length - 1].sp_id })
            })
            .catch(err => {
                console.log("loi khi get sanpham : ", err)
            })
        axios.get(`http://localhost:8080/api/test/thuong-hieu`)
            .then(res => {
                this.setState({ thuongHieus: res.data })
            })
            .catch(err => {
                console.log("loi khi get thuong hieu : ", err)
            })
        axios.get(`http://localhost:8080/api/test/khuyen-mai`)
            .then(res => {
                this.setState({ khuyenMais: res.data })
            })
            .catch(err => {
                console.log("loi khi get tkhuyen mai o ProductAdmin : ", err)
            })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const postData = {
            sp_card: this.state.cardDoHoa,
            sp_cpu: this.state.cpu,
            sp_ram: this.state.ram,
            sp_gia: this.state.giaBan,
            sp_manhinh: this.state.kichThuocManHinh,
            sp_mota: this.state.moTaChiTiet,
            sp_ocung: this.state.oCung,
            sp_soluong: this.state.soluong,
            sp_ten: this.state.tenSanPham,
            thuonghieu: this.state.thuonghieu,
            listIdDactinh: this.state.dacTinhs
        }
        if (this.state.isUpdate === 0) {
            const idLast = this.state.idSanPhamLast + 1
            axios.post(`http://localhost:8080/api/test/san-pham`, postData)
                .then(res => {
                    console.log(res.data)
                    alert("Them san pham thanh cong")
                    this.handleSaveImgs(idLast)
                    this.RerenderProduct()
                    this.cleadState()
                })
                .catch(err => {
                    console.log("loi khi them san pham o productAdmin: ", err)
                })
        } else {
            this.handleSubmitUpdate()
        }
    };
    handleUploadImg = (acceptedFiles) => {
        this.setState({ anhPost: acceptedFiles })
    }
    handleSaveImgs(idSanPham) {
        const formData = new FormData();
        this.state.anhPost.forEach((img) => {
            formData.append("images", img)
        })
        axios.post(`http://localhost:8080/api/test/post-img?sanPhamid=${idSanPham}`, formData)
            .then(res => {
                console.log("dax luu anh vao csdl cho sp: ", idSanPham)
            })
            .catch(err => {
                console.log("loi khi luu anh o productAdmin", err)
            })
    }
    handleShowFormUpdate = (sanPham) => {
        const dactinh = sanPham.dacTinhs.map(item => item.dt_id)
        this.setState({
            tenSanPham: sanPham.sp_ten,
            ram: sanPham.sp_ram,
            cpu: sanPham.sp_cpu,
            kichThuocManHinh: sanPham.sp_manhinh,
            oCung: sanPham.sp_ocung,
            cardDoHoa: sanPham.sp_card,
            moTaChiTiet: sanPham.sp_mota,
            giaBan: sanPham.sp_gia,
            soluong: sanPham.sp_soluong,
            thuonghieu: sanPham.thuonghieu.th_id,
            khuyenmai: sanPham.khuyenMai,
            dacTinhs: dactinh,
            idSanPhamUpdate: sanPham.sp_id,
            isUpdate: 1,
        })
        window.scrollTo(0, document.body.scrollHeight);
    }
    handleSubmitUpdate() {
        const putData = {
            sp_card: this.state.cardDoHoa,
            sp_cpu: this.state.cpu,
            sp_ram: this.state.ram,
            sp_gia: this.state.giaBan,
            sp_manhinh: this.state.kichThuocManHinh,
            sp_mota: this.state.moTaChiTiet,
            sp_ocung: this.state.oCung,
            sp_soluong: this.state.soluong,
            sp_ten: this.state.tenSanPham,
            thuonghieu: this.state.thuonghieu,
            khuyenmai: this.state.khuyenmai,
            listIdDactinh: this.state.dacTinhs
        }
        const idSanPham = this.state.idSanPhamUpdate
        if (idSanPham !== null) {
            axios.put(`http://localhost:8080/api/test/san-pham/${idSanPham}`, putData)
                .then(res => {
                    console.log(res.data)
                    alert(`cap nhat thanh cong cho san pham co id: ${idSanPham}`)
                    this.RerenderProduct()
                    this.cleadState()
                })
                .catch(err => {
                    console.log("loi tai cap nhat san pham ProductAdmin: ", err)
                })
        } else {
            console.log("chua lay duopc id san pham")
        }
    }
    handleDeleteProduct(idSanPham) {
        axios.delete(`http://localhost:8080/api/test/san-pham/${idSanPham}`)
            .then(res => {
                console.log(res.data)
                if (res.status === 204) {
                    alert("xoas thanh cong san pham: ", idSanPham)
                    this.RerenderProduct()
                }
            })
            .catch(err => {
                console.log("loi khi xoa san pham o ProductAdmin: ", err)
            })
    }
    RerenderProduct = e => {
        axios.get(`http://localhost:8080/api/test/san-pham`)
            .then(res => {
                this.setState({ sanPhams: res.data })
                this.setState({ idSanPhamLast: res.data[res.data.length - 1].sp_id })
            })
            .catch(err => {
                console.log("loi khi get sanpham : ", err)
            })
    }
    handleViewDactinhById(id) {
        switch (id) {
            case 1: return "Văn phòng giá rẻ";
            case 2: return "Văn phòng tầm trung";
            case 3: return "Văn phòng cao cấp";
            case 4: return "Gaming giá rẻ";
            case 5: return "Gaming tầm trung";
            case 6: return "Gaming cao cấp";
            case 7: return "Kỹ thuật giá rẻ";
            case 8: return "Kỹ thuật tầm trung";
            case 9: return "Kỹ thuật cao cấp";
            default:
        }

    }

    render() {
        const idDacTinhs = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const { sanPhams, thuongHieus, khuyenMais, isUpdate } = this.state
        const hinhAnh = this.props.hinhAnh
        return (
            <div className="container-admin" style={{ display: "flex" }}>
                <div className="container-left" style={{ width: 'calc(100%/12*2)' }}><MenuAdmin /></div>
                <div className="container-right" style={{ width: 'calc(100%/12*10)' }}>
                    <div className="content-main">
                        <div className="content-main__listProduct">
                            <h1 className="content-main__list-title">Danh sách sản phẩm hiện có:</h1>
                            <div className="content-main__list-table">
                                {sanPhams.length === 0 ? <LoadingIcon /> :
                                    <table className="content-main__table">
                                        <thead>
                                            <tr>
                                                <th className="table-title table-title__img" style={{ width: '10%', textAlign: 'center' }}>Hình ảnh</th>
                                                <th className="table-title table-title__name" style={{ width: '20%', textAlign: 'center' }}>Tên sản phẩm</th>
                                                <th className="table-title table-title__ram" style={{ width: '5%', }}>RAM</th>
                                                <th className="table-title table-title__cpu" style={{ width: '10%', textAlign: 'center' }}>CPU</th>
                                                <th className="table-title table-title__manhinh" style={{ width: '15%', textAlign: 'center' }}>Màn hình</th>
                                                <th className="table-title table-title__card" style={{ width: '10%', textAlign: 'center' }}>Card</th>
                                                <th className="table-title table-title__ocung" style={{ width: '10%', textAlign: 'center' }}>Ổ cứng</th>
                                                <th className="table-title table-title__sl" style={{ width: '10%', textAlign: 'center' }}>Số lượng tồn</th>
                                                <th className="table-title table-title__price" style={{ width: '10%', textAlign: 'center' }}>Giá</th>
                                                <th colSpan={2}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sanPhams.map((sanPham, index) => (
                                                <tr key={index} className="table-contetn__item">
                                                    <td className="table-content">
                                                        <div className="table-content__img" style={{ backgroundImage: `url(data:image/jpg;base64,${hinhAnh[sanPham.sp_id]})` }}></div>
                                                    </td>
                                                    <td className="table-content table-content__name">{sanPham.sp_ten}</td>
                                                    <td className="table-content" style={{ textAlign: 'center' }}>{sanPham.sp_ram} GB</td>
                                                    <td className="table-content" style={{ textAlign: 'center' }}>{sanPham.sp_cpu}</td>
                                                    <td className="table-content table-content__manhinh">{sanPham.sp_manhinh}</td>
                                                    <td className="table-content" style={{ textAlign: 'center' }}>{sanPham.sp_card}</td>
                                                    <td className="table-content" style={{ textAlign: 'center' }}>{sanPham.sp_ocung}</td>
                                                    <td className="table-content" style={{ textAlign: 'center' }}>{sanPham.sp_soluong}</td>
                                                    <td className="table-content" style={{ textAlign: 'center' }}>{sanPham.sp_gia.toLocaleString()} VNĐ</td>
                                                    <td>
                                                        <button onClick={() => this.handleShowFormUpdate(sanPham)} type="button" className="btn btn-primary">
                                                            Sửa
                                                        </button>
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <button onClick={() => this.handleDeleteProduct(sanPham.sp_id)} type="button" className="btn btn-danger" style={{ backgroundColor: "#fff" }}>
                                                            <FontAwesomeIcon style={{ cursor: "pointer" }} className="card-quatity-removebtn-icon" icon={faTrash} />
                                                        </button>
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                        {isUpdate !== 0 ?
                            <div className="content-main__top" style={{ display: "flex" }}>
                                <h1 style={{ marginRight: '5px', color: "blue", cursor: 'pointer' }} className="container-title" onClick={() => { this.setState({ isUpdate: 0 }) }}> Thêm sản phẩm</h1>
                                <h1 className="container-title">Cập nhật sản phẩm</h1>
                            </div>
                            :
                            <div className="content-main__top" style={{ display: "flex" }}>
                                <h1 className="container-title">Thêm sản phẩm</h1>
                            </div>
                        }
                        <div className="content-main__form">
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label>Tên sản phẩm:</label>
                                    <input
                                        type="text"
                                        name="tenSanPham"
                                        value={this.state.tenSanPham}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Ram:</label>
                                    <input
                                        type="text"
                                        name="ram"
                                        value={this.state.ram}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label>CPU:</label>
                                    <input
                                        type="text"
                                        name="cpu"
                                        value={this.state.cpu}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Kích thước màn hình:</label>
                                    <input
                                        type="text"
                                        name="kichThuocManHinh"
                                        value={this.state.kichThuocManHinh}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Ổ cứng:</label>
                                    <input
                                        type="text"
                                        name="oCung"
                                        value={this.state.oCung}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Card đồ họa:</label>
                                    <input
                                        type="text"
                                        name="cardDoHoa"
                                        value={this.state.cardDoHoa}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Mô tả chi tiết:</label>
                                    <textarea
                                        name="moTaChiTiet"
                                        value={this.state.moTaChiTiet}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Số lượng:</label>
                                    <input
                                        type="number"
                                        name="soluong"
                                        value={this.state.soluong}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Giá bán:</label>
                                    <input
                                        type="text"
                                        name="giaBan"
                                        value={this.state.giaBan}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <label style={{ width: '30%' }}>Đặc tính của sản phẩm:</label>
                                    <div className="checkboxGroup">
                                        {
                                            idDacTinhs.map(id => (
                                                <label className="checkboxDacTinh" key={id}>
                                                    <input
                                                        className="checkboxInput"
                                                        type="checkbox"
                                                        name="numberGroup"
                                                        value={id}
                                                        checked={this.state.dacTinhs.includes(id)}
                                                        onChange={this.handleCheckDactinh}
                                                    />
                                                    {this.handleViewDactinhById(id)}
                                                </label>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div>
                                    <label>Thương hiệu:</label>
                                    <select
                                        name="thuonghieu"
                                        value={this.state.thuonghieu}
                                        onChange={this.handleChange}
                                    >
                                        <option value="">-- Chọn thương hiệu của sản phẩm --</option>
                                        {thuongHieus.map(item => (
                                            <option key={item.th_id} value={item.th_id}>{item.th_ten}</option>
                                        ))}
                                    </select>
                                </div>
                                {isUpdate !== 0 ?
                                    <div>
                                        <label>Khuyến mãi:</label>
                                        <select
                                            name="khuyenmai"

                                            value={this.state.khuyenmai !== null ? this.state.khuyenmai.gg_id : this.state.khuyenmai}
                                            onChange={this.handleChange}
                                        >
                                            <option value="">-- Chọn khuyến mãi của sản phẩm --</option>
                                            {khuyenMais.map(item => (
                                                <option key={item.gg_id} value={item.gg_id}>{item.gg_ten}</option>
                                            ))}
                                        </select>
                                    </div>
                                    :
                                    <div>
                                        <div style={{ display: "flex" }}>
                                            <label>Hình ảnh:</label>
                                            <Dropzone onDrop={this.handleUploadImg}>
                                                {({ getRootProps, getInputProps }) => (
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <p>Tải lên ảnh sản phẩm</p>
                                                    </div>
                                                )}
                                            </Dropzone>
                                        </div>
                                        <div className="img-posted">
                                            <label>Ảnh đã tải lên:</label>
                                            <ul className="list-anh-post">
                                                {this.state.anhPost.map((img, index) => (
                                                    <li className="anh-post-item" key={index}>
                                                        <img src={URL.createObjectURL(img)} alt={`anh ${index}`} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                }
                                <div>
                                    {isUpdate !== 0 ?
                                        <button className="btn-submit-form" type="submit">Lưu thay đổi</button>
                                        :
                                        <button className="btn-submit-form" type="submit">Thêm sản phẩm</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const layHinhAnhTuStore = (state) => ({
    hinhAnh: state.hinhAnh,
});

export default connect(layHinhAnhTuStore)(ProductAdmin);