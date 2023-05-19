
import './App.css';

import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { isLoginCheck } from './redux/actions/userAction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navigation } from './components/Navigation';
import { Main } from './pages/Main';

import { Login } from './pages/user/Login';
import { Signup } from './pages/user/Signup';
import { MyPage } from './pages/user/MyPage';

import { AdminPage } from './pages/admin/AdminPage';
import { StoreMain } from './pages/store/StoreMain';

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
    </>
  )
}

function App() {

  const dispatch = useDispatch();
  const getUserState = useSelector((state) => state.user);

  // useEffect의 상황별 사용 방법.
  // 1. 페이지가 렌더링 될 때마다 실행.
  useEffect(() => {

  });

  // 2. 페이지가 최초 렌더링 될 때만 1번 실행.
  useEffect(() => {
    console.log('로그인 상태 확인.');
    dispatch(isLoginCheck());
    // eslint-disable-next-line
  }, []);

  // 3. 페이지가 렌더링 될 때마다, 그리고 배열인자 내부의 값이 변화할 때마다 실행.
  useEffect(() => {
    if (getUserState.flagvalue.isLogin) {
      console.log(getUserState);
    };
    // eslint-disable-next-line
  }, [getUserState.userdata]);

  return (
    <AppBackGround>
      <Routes>

        <Route path='/' element={<Layout />} >
          <Route index element={<Main />} />
        </Route>

        <Route path='user/*' element={<Layout />} >
          <Route path='login' element={!getUserState.flagvalue.isLogin ? <Login /> : <Navigate to='/' replace={true} />} />
          <Route path='signup' element={!getUserState.flagvalue.isLogin ? <Signup /> : <Navigate to='/' replace={true} />} />
          <Route path='mypage' element={<MyPage />} />
          <Route path='adminpage' element={<AdminPage />} />
        </Route>

        <Route path='store/*' element={<Layout />} >
          <Route index element={<StoreMain />} />
        </Route>

      </Routes>
    </AppBackGround>
  );
}

export default App;
