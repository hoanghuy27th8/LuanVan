import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import HeaderComponent from './components/Header/HeaderComponent';
import FooterComponent from './components/Footer/FooterComponent';
import ProductDetail from './pages/ProductDetail';
import HomePage from './pages/HomePage';
import Card from './pages/Card';
import Comment from './pages/Comment';
import Category from './pages/Category';
import Loggin from './pages/Loggin';
import Register from './pages/Register';
import PurchaseHistory from './pages/PurchaseHistory';
import DetailPurchaseHistory from './pages/DetailPurchaseHistory';
import Payment from './pages/Payment';
import HomeAdmin from './pages/admin/HomeAdmin';
import ProductAdmin from './pages/admin/ProductAdmin';
import SaleOff from './pages/admin/SaleOff';
import UserAdmin from './pages/admin/UserAdmin';
import OrderAdmin from './pages/admin/OrderAdmin';
import DetailsOrderAdmin from './pages/admin/DetailsOrderAdmin';
import Thanks from './pages/Thanks';
import Search from './components/Search/Search';
import KhuyenMaiAll from './components/Khuyenmai/KhuyenMaiAll';
import UserInfoContainer from './components/UserInfo/UserInfoContainer';
import Suggest from './pages/Suggest';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
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

        dispatch({ type: 'SET_HINHANH', payload: dsAnhs });
      });
  }, [dispatch]);


  // Biến trạng thái để kiểm tra xem có hiển thị HeaderComponent và FooterComponent hay không
  const shouldDisplayHeaderFooter = (path) => {
    return !path.startsWith('/admin') && path !== '/dang-nhap' && path !== '/dang-ky' && !path.startsWith('/san-pham') && path !== '/cam-on';
  };
  return (
    <div>
      <Router>
        <Switch>
          <Route
            path="/"
            render={({ location }) => (
              shouldDisplayHeaderFooter(location.pathname) && <HeaderComponent />
            )}
          />
        </Switch>

        <div className='container-fluid custom-container'>
          <Switch>
            <Route path='/admin' exact component={HomeAdmin}></Route>
            <Route path='/admin/san-pham' exact component={ProductAdmin}></Route>
            <Route path='/admin/khuyen-mai' exact component={SaleOff}></Route>
            <Route path='/admin/tai-khoan' exact component={UserAdmin}></Route>
            <Route path='/admin/don-hang' exact component={OrderAdmin}></Route>
            <Route path='/admin/don-hang/:orderId' exact component={DetailsOrderAdmin}></Route>
            <Route path='/' exact component={HomePage}></Route>
            <Route path='/dang-nhap' exact component={Loggin}></Route>
            <Route path='/dang-ky' exact component={Register}></Route>
            <Route path='/trang-chu' exact component={HomePage}></Route>
            <Route path='/gio-hang' exact component={Card}></Route>
            <Route path='/thanh-toan' exact component={Payment}></Route>
            <Route path='/lich-su-mua-hang' exact component={PurchaseHistory}></Route>
            <Route path='/lich-su-mua-hang/:donhangID' exact component={DetailPurchaseHistory}></Route>
            <Route path='/thong-tin' exact component={UserInfoContainer}></Route>
            <Route path='/san-pham/:sanphamID' exact component={ProductDetail}></Route>
            <Route path='/danh-gia/:sanphamID' exact component={Comment}></Route>
            <Route path='/danh-muc/:tendanhmuc' exact component={Category}></Route>
            <Route path='/cam-on' exact component={Thanks}></Route>
            <Route path='/search' exact component={Search}></Route>
            <Route path='/khuyen-mai' exact component={KhuyenMaiAll}></Route>
            <Route path='/goi-y' exact component={Suggest}></Route>
          </Switch>
        </div>

        <Switch>
          <Route
            path="/"
            render={({ location }) => (
              shouldDisplayHeaderFooter(location.pathname) && <FooterComponent />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}



export default App;
