
import './App.css';

import { Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Navigation } from './components/Navigation';
import { Index } from './pages/Index';
import { Login } from './pages/user/Login';
import { Signup } from './pages/user/Signup';
import { isLoginCheck } from './redux/actions/userAction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AppBackGround = styled.div`
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

  const getUserData = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(isLoginCheck());

    console.log(getUserData);

    // eslint-disable-next-line
  }, [])

  return (
    <AppBackGround>
      <Routes>

        <Route path='/' element={<Layout />} >
          <Route index element={<Index />} />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>

      </Routes>
    </AppBackGround>
  );
}

export default App;
