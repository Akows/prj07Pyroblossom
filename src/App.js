
import './App.css';

import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { IsLoginCheck } from './redux/actions/userAction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navigation } from './components/Navigation';
import { Main } from './pages/Main';

import { Login } from './pages/user/Login';
import { Signup } from './pages/user/Signup';
import { MyPage } from './pages/user/MyPage';

import { AdminPage } from './pages/admin/AdminPage';
import { StoreMain } from './pages/store/StoreMain';
import { StoreNavigation } from './components/StoreNavigation';
import { ProductList } from './pages/store/ProductList';
import { ProductDetail } from './pages/store/ProductDetail';
import { StoreMyPage } from './pages/store/StoreMyPage';
import { PaymentPage } from './pages/store/PaymentPage';
import { Footer } from './components/Footer';
import { Loading } from './components/Loading';
import { ShoppingBasket } from './pages/store/ShoppingBasket';


const AppBackGround = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: 'GIFont';
`;

const Layout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

const UserLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

const StoreLayout = () => {
  return (
    <>
      <StoreNavigation />
      <Outlet />
      <Footer />
    </>
  );
};

const NoNavLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

function App() {

  const dispatch = useDispatch();
  const getUserState = useSelector((state) => state.user);

  useEffect(() => {
    console.log('로그인 상태 확인.');
    dispatch(IsLoginCheck());
    // eslint-disable-next-line
  }, []);

  return (
    <AppBackGround>
      <Routes>

        <Route path='/' element={<Navigate to='/store' />} >
          {/* <Route index element={<Main />} /> */}
        </Route>

        <Route path='user/*' element={<UserLayout />} >
          <Route path='login' element={!getUserState.flagvalue.isLogin ? <Login /> : <Navigate to='/' replace={true} />} />
          <Route path='signup' element={!getUserState.flagvalue.isLogin ? <Signup /> : <Navigate to='/' replace={true} />} />
          <Route path='mypage' element={getUserState.flagvalue.isLogin ? <MyPage /> : <Navigate to='/' replace={true} />} />
          <Route path='adminpage' element={getUserState.flagvalue.isLogin ? <AdminPage /> : <Navigate to='/' replace={true} />} />
        </Route>

        <Route path='store/*' element={<StoreLayout />} >
          <Route index element={<StoreMain />} />
          <Route path='productlist/:searchtype/:keyword' element={<ProductList />} />
          <Route path='productdetail/:id' element={<ProductDetail />} />
          <Route path='payment' element={getUserState.flagvalue.isLogin ? <PaymentPage /> : <Navigate to='/store' replace={true} />} />
        </Route>

        <Route path='store/mypage/*' element={<NoNavLayout />} >
          <Route index element={getUserState.flagvalue.isLogin ? <StoreMyPage /> : <Navigate to='/store' replace={true} />} />
          <Route path='shoppingbasket' element={getUserState.flagvalue.isLogin ? <ShoppingBasket /> : <Navigate to='/store' replace={true} />} />
        </Route>



        <Route path='freeboard/*' element={<Layout />} >
          <Route index element={<Loading />} />
        </Route>

      </Routes>
    </AppBackGround>
  );
}

export default App;
