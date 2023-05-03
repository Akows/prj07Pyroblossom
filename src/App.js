
import './App.css';

import { Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Navigation } from './components/Navigation';
import { Index } from './pages/Index';
import { Login } from './pages/Login';

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

  return (
    <AppBackGround>
      <Routes>

        <Route path='/' element={<Layout />} >
          <Route index element={<Index />} />

          <Route path='login' element={<Login />} />
        </Route>


      </Routes>
    </AppBackGround>
  );
}

export default App;
