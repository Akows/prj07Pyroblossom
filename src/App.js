
import './App.css';

import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Index } from './pages/Index';

function App() {

  const AppBackGround = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return (


    <AppBackGround>
      <Routes>
        <Route path='/' element={<Index />} />
      </Routes>
    </AppBackGround>
  );
}

export default App;
