
import './App.css';

import { Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Index } from './pages/Index';
import { Navigation } from './components/Navigation';

const Layout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  )
}

function App() {

  const AppBackGround = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: 'GIFont';
  `;

  return (


    <AppBackGround>
      <Routes>

        <Route path='/' element={<Layout />} >
          <Route index element={<Index />} />
        </Route>


      </Routes>
    </AppBackGround>
  );
}

export default App;
