import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import axiosInstance, { addTokenJwtToAxiosInstance } from '../../axios/axios';
import { addTokenToLocalStorage } from '../../localStorage/localStorage';
import { addTokenToSessionStorage } from '../../sessionStorage/sessionStorage';

const actionCheckLogin = createAsyncThunk(
  'user/CHECK_LOGIN',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.post('/login', {
      email: state.authReducer.credentials.email,
      password: state.authReducer.credentials.password,
    });
    const { message, accessToken, refreshToken, user } = response.data;

    addTokenJwtToAxiosInstance(accessToken);
    addTokenToLocalStorage();
    addTokenToSessionStorage();

    return { user, message };
  }
);

export default actionCheckLogin;
