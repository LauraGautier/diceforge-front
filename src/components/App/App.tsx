import { Route, Routes, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTokenJwtToAxiosInstance } from '../../axios/axios';
import setupInterceptors from '../../axios/axiosInterceptors';
import { useAppSelector } from '../../hooks/hooks';
import { actionIsLogged } from '../../store/reducers/authReducer'; // Make sure the file path is correct and the necessary dependencies are installed.
import Binder from '../Binder/Binder';
import CreateGame from '../CreateGame/CreateGame';
import CreateSheet from '../CreateSheet/CreateSheet';
import ForgotPassword from '../Forgot-password/Forgot-password';
import EditGame from '../Game/EditGame';
import Game from '../Game/Game';
import Home from '../Home/Home';
import Login from '../Login/Login';
import EditProfile from '../Profile/EditProfile';
import Profile from '../Profile/Profile';
import ResetPassword from '../Reset-password/Reset-password';
import Sheet from '../Sheet/Sheet';
import Signup from '../Signup/Signup';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const isLogged = useAppSelector((state) => state.auth.isLogged);
  // const gameReducer = useAppSelector((state) => state.game);
  // const gameId = useAppSelector((state) => state.game.gameId);

  console.log('je suis le state de app :', user);
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  /* The `useEffect` hook in the provided code snippet is responsible for checking
  if a token is stored in the session storage. If a token is found, it adds the
  token to the Axios instance using the `addTokenJwtToAxiosInstance` function. */
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      addTokenJwtToAxiosInstance(token);
      if (!isLogged) {
        const userData = sessionStorage.getItem('user');
        if (userData) {
          dispatch(actionIsLogged(JSON.parse(userData)));
        }
      }
    }
  }, [dispatch, isLogged]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/signup" element={<Signup />} />
        <Route path="/api/creategame" element={<CreateGame />} />
        <Route path="/api/game/:gameId" element={<Game />} />
        <Route path="/api/createsheet" element={<CreateSheet />} />
        <Route path="/api/sheet" element={<Sheet />} />
        <Route path="/api/binder/:gameId" element={<Binder />} />
        <Route path="/api/profile" element={<Profile />} />
        <Route path="/api/forgot-password" element={<ForgotPassword />} />
        <Route path="/api/reset-password" element={<ResetPassword />} />
        <Route path="/api/edit-profile" element={<EditProfile />} />
        <Route path="/api/edit-game" element={<EditGame />} />
      </Routes>
    </div>
  );
}

export default App;
