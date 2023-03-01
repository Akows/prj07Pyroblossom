
import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  setUser,
  clearUser,
  currentUser,
  userIsLoading,
} from './redux/reducer/userSlice';

import { appAuth } from './configs/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';

import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/login';

function App() {

  const navigate = useNavigate();
  let dispatch = useDispatch();

  const isCurrentUser = useSelector(currentUser);
  const isLoading = useSelector(userIsLoading);

  useEffect(() => {
    onAuthStateChanged(appAuth, (user) => {
      if (user) {
        navigate('/');
        dispatch(setUser({          
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous
        }));
      }
      else {
        navigate('/login');
        dispatch(clearUser());
      }
    });
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <div>...loading</div>;
  } 
  else {
    return (
      <Routes>
        <Route path='/' element={isCurrentUser ? <Home /> : <Navigate replace={true} to='/login' />}/>
  
        <Route path='/login' element={!isCurrentUser ? <Login /> : <Navigate replace={true} to='/' />}/>
      </Routes>
    );
  };
};

export default App;
