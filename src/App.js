
import './App.css';

import { Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { isLoginCheck } from './redux/actions/userAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Navigation } from './components/Navigation';
import { Main } from './pages/Main';

import { Login } from './pages/user/Login';
import { Signup } from './pages/user/Signup';
import { MyPage } from './pages/user/MyPage';

import { AdminPage } from './pages/admins/AdminPage';

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

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = 'Genshin Fyro Blossom';

    dispatch(isLoginCheck());
    dispatch({ type: 'PROCESSINIT' });
    // eslint-disable-next-line
  }, []);

  return (
    <AppBackGround>
      <Routes>

        <Route path='/' element={<Main />} />

        <Route path='user/*' element={<Layout />} >
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='mypage' element={<MyPage />} />
          <Route path='adminpage' element={<AdminPage />} />
        </Route>

        {/* <Route path='/test' element={<Login2 />} /> */}


        {/* <Route path='/' element={<Layout />} >
          <Route index element={<Index />} />

          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />

          <Route path='mypage' element={<MyPage />} />

          <Route path='admin' element={<AdminPage />} />
        </Route> */}

      </Routes>
    </AppBackGround>
  );
}

export default App;
