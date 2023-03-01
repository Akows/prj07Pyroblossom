
import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { setUser, clearUser } from './redux/actions/user_action';

import { appAuth } from './configs/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';

import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/login';

function App() {

  const navigate = useNavigate();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.userReducer.isLoading);
  const currentUser = useSelector((state) => state.userReducer.currentUser);

  useEffect(() => {
    onAuthStateChanged(appAuth, (user) => {
      if (user) {
        navigate('/');
        dispatch(setUser(user));
      } 
      else {
        navigate('/login');
        dispatch(clearUser());
      }
    });
  }, []);

  if (isLoading) {
    return <div>...loading</div>;
  } 
  else {
    return (
      <Routes>
        <Route path='/' element={currentUser ? <Home /> : <Navigate replace={true} to='/login' />}/>
  
        <Route path='/login' element={!currentUser ? <Login /> : <Navigate replace={true} to='/' />}/>
      </Routes>
    );
  };
};

export default App;
