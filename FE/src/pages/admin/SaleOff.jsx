import React, { Component } from "react";
import MenuAdmin from "./components/MenuAdmin";
import '../css/admin/SaleOff.css'
import axios from "axios";
import AlertSuccess from "../../components/Alert/AlertSuccess";
import { parse, format } from 'date-fns';



class SaleOff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promotionName: '',
            startDate: '',
            endDate: '',
            discountAmount: '',
            listPromotion: [],
            isUpdate: false,
            idUpdate: '',
            thongbao:'',
            showThongBao: false
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleDateTime(dateInput) {
        const date = new Date(dateInput)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    }
    cleanState() {
        this.setState({
            promotionName: '',
            startDate: '',
            endDate: '',
            discountAmount: '',
            isUpdate: false,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const KMaiPost = {
            gg_ten: this.state.promotionName,
            gg_ngaybatdau: this.handleDateTime(this.state.startDate),
            gg_ngayketthuc: this.handleDateTime(this.state.endDate),
            gg_mucgiamgia: this.state.discountAmount
        }
        axios.post(`http://localhost:8080/api/test/khuyen-mai/`, KMaiPost)
            .then(res => {
                console.log(res.data)
                this.setState({
                    showThongBao: true,
                    thongbao: 'Thêm khuyến mãi thành công'
                })
                this.ReRenderTable()
                this.cleanState()
            })
            .catch(err => {
                console.log("Loi khi them khuyen mai: ", err)
            })
    }
    handleUpdate = (khuyenmai) => {
        const startDateNoFotmater = parse(khuyenmai.gg_ngaybatdau, 'dd-MM-yyyy', new Date())
        const startDate = format(startDateNoFotmater, 'yyyy-MM-dd')
        const lastDateNoFotmater = parse(khuyenmai.gg_ngayketthuc, 'dd-MM-yyyy', new Date())
        const endDate = format(lastDateNoFotmater, 'yyyy-MM-dd')
        this.setState({
            promotionName: khuyenmai.gg_ten,
            startDate: startDate,
            endDate: endDate,
            discountAmount: khuyenmai.gg_mucgiamgia,
            isUpdate: true,
            idUpdate: khuyenmai.gg_id
        })
    }
    handleUpdate2 = () => {
        const putData = {
            gg_ten: this.state.promotionName,
            gg_ngaybatdau: this.handleDateTime(this.state.startDate),
            gg_ngayketthuc: this.handleDateTime(this.state.endDate),
            gg_mucgiamgia: this.state.discountAmount
        }
        const { idUpdate } = this.state
        axios.put(`http://localhost:8080/api/test/khuyen-mai/${idUpdate}`, putData)
            .then(res => {
                console.log(res.data)
                this.setState({
                    showThongBao: true,
                    thongbao: 'Cập nhật khuyến mãi thành công'
                })
                this.ReRenderTable()
                this.cleanState()
            })
            .catch(err => {
                console.log("Loi khi update khuyen mai: ", err)
            })
    }
    handleRemove = id => {
        console.log(id)
        axios.delete(`http://localhost:8080/api/test/khuyen-mai/${id}`)
            .then(res => {
                console.log(res.status)
                this.setState({
                    showThongBao: true,
                    thongbao: 'Xóa khuyến mãi thành công'
                })
                this.ReRenderTable()
            })
            .catch(err => {
                console.log('Loi khi xoa khuyen mai: ', err)
            })
    }
    authenticationUser(){
        const {cookies} = this.props
        this.setState({idAdmin: cookies.get('User')})
        if(cookies.get('User') === undefined || cookies.get('Role')!=='ADMIN'){
            this.props.history.push("/dang-nhap")
        }
    }
    componentDidMount() {
        // this.authenticationUser()
        axios.get(`http://localhost:8080/api/test/khuyen-mai`)
            .then(res => {
                this.setState({ listPromotion: res.data })
            })
            .catch(err => {
                console.log(`Loi khi load khuyen mai: ${err}`)
            })
    }
    ReRenderTable() {
        axios.get(`http://localhost:8080/api/test/khuyen-mai`)
            .then(res => {
                this.setState({ listPromotion: res.data })
            })
            .catch(err => {
                console.log(`Loi khi load khuyen mai: ${err}`)
            })
    }
    closeAlert = () => {
        this.setState({ showThongBao: false, thongbao: '' });
    };


    render() {
        const { listPromotion, isUpdate, showThongBao, thongbao } = this.state
        return (
            <div className="container-admin" style={{ display: "flex" }}>
                <div className="container-left" style={{ width: 'calc(100%/12*2)' }}><MenuAdmin /></div>
                <div className="container-right" style={{ width: 'calc(100%/12*10)' }}>
                    <div className="content-main">
                        <div className="content-main__listProduct">
                            <h1 className="content-main__list-title">Danh sách khuyến mãi đang có:</h1>
                            <div className="content-main__list-table">
                                <table className="content-main__table">
                                    <thead>
                                        <tr>
                                            <th className="table-title table-title__img" style={{ width: '20%', textAlign: 'center' }}>Mức khuyến mãi</th>
                                            <th className="table-title table-title__name" style={{ width: '20%', textAlign: 'center' }}>Tên khuyến mãi</th>
                                            <th className="table-title table-title__sl" style={{ width: '20%', textAlign: 'center' }}>Ngày bắt đầu</th>
                                            <th className="table-title table-title__price" style={{ width: '20%', textAlign: 'center' }}>Ngày kết thúc</th>
                                            <th colSpan={2} style={{ width: '5%', textAlign: 'center' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listPromotion.map(item => (
                                            <tr key={item.gg_id} className="table-contetn__item">
                                                <td className="table-content table-content__name" style={{ color: 'red', textAlign: 'center', fontWeight: '600' }}>{item.gg_mucgiamgia}%</td>
                                                <td className="table-content" style={{ textAlign: 'center' }}>{item.gg_ten}</td>
                                                <td className="table-content" style={{ textAlign: 'center' }}>{item.gg_ngaybatdau}</td>
                                                <td className="table-content" style={{ textAlign: 'center', fontWeight: 600 }}>{item.gg_ngayketthuc}</td>
                                                <td><button onClick={e => this.handleUpdate(item)} type="button" className="btn btn-primary">Sửa</button></td>
                                                <td><button onClick={e => this.handleRemove(item.gg_id)} type="button" className="btn btn-danger">Xóa</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="content-form">
                            {showThongBao === true? <AlertSuccess message = {thongbao} closeAlert = {this.closeAlert} /> : ''}
                            <h2 className="content-form__title">Tạo khuyến mãi mới</h2>
                            <form className="content-form__add" onSubmit={this.handleSubmit}>
                                <div>
                                    <label htmlFor="promotionName">Tên khuyến mãi:</label>
                                    <input
                                        type="text"
                                        id="promotionName"
                                        name="promotionName"
                                        value={this.state.promotionName}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="startDate">Ngày bắt đầu:</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={this.state.startDate}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="endDate">Ngày kết thúc:</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={this.state.endDate}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="discountAmount">Mức giảm giá:(%)</label>
                                    <input
                                        type="number"
                                        id="discountAmount"
                                        name="discountAmount"
                                        value={this.state.discountAmount}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                {isUpdate === false ?
                                    <div>
                                        <button className="btn-add-khuyen-mai" type="submit">Tạo khuyến mãi</button>
                                    </div>
                                    :
                                    <div>
                                        <button className="btn-add-khuyen-mai" type="button" onClick={e => this.handleUpdate2()}>Lưu khuyến mãi</button>
                                    </div>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SaleOff;
