import { createAction, createReducer } from '@reduxjs/toolkit';
import { removeTokenJwtFromAxiosInstance } from '../../axios/axios';
import actionCheckLogin from '../thunks/authThunks';

export interface UserState {
  user: {
    userId: number;
    lastname: string;
    firstname: string;
    image: string;
  };
  credentials: {
    email: string;
    password: string;
  };
  message: string;
  isLogged: boolean;
}

export const userInitialState: UserState = {
  user: {
    userId: 0,
    lastname: '',
    firstname: '',
    image: '',
  },
  credentials: {
    email: '',
    password: '',
  },
  message: '',
  isLogged: false,
};

export const actionSetCredentials = createAction<{
  name: 'email' | 'password';
  value: string;
}>('SET_CREDENTIALS');

export const actionIsLogged = createAction<{
  isLogged: boolean;
  userId: number;
  lastname: string;
  firstname: string;
  image: string;
}>('IS_LOGGED');

export const actionUserLogout = createAction('USER_LOGOUT');

const authReducer = createReducer(userInitialState, (builder) => {
  builder
    .addCase(actionSetCredentials, (state, action) => {
      state.credentials[action.payload.name] = action.payload.value;
    })
    .addCase(actionCheckLogin.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isLogged = true;
      state.credentials = { email: '', password: '' };
    })
    .addCase(actionCheckLogin.rejected, (state, action) => {
      state.isLogged = false;
      state.message = action.error.message || 'Erreur';
    });
}).addCase(actionUserLogout, (state) => {
  state.isLogged = false;
  state.user = {
    userId: 0,
    lastname: '',
    firstname: '',
    image: '',
  };
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  removeTokenJwtFromAxiosInstance();
});

export default authReducer;
