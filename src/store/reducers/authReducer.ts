import { createAction, createReducer } from '@reduxjs/toolkit';
import {
  addTokenJwtToAxiosInstance,
  removeTokenJwtFromAxiosInstance,
} from '../../axios/axios';
import { addAccessTokenToSessionStorage } from '../../sessionStorage/sessionStorage';
import {
  actionCheckLogin,
  actionRefreshToken,
  actionRegister,
} from '../thunks/authThunks';

export interface UserState {
  user: {
    userId: number;
    lastname: string;
    firstname: string;
    image: string;
  };
  newUser: {
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  credentials: {
    email: string;
    password: string;
  };
  message: string;
  error: string;
  isLogged: boolean;
  refreshToken: string;
}

export const userInitialState: UserState = {
  user: {
    userId: 0,
    lastname: '',
    firstname: '',
    image: '',
  },
  newUser: {
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  credentials: {
    email: '',
    password: '',
  },
  message: '',
  error: '',
  isLogged: false,
  refreshToken: '',
};

export const actionSetRefreshToken = createAction<string>('SET_REFRESH_TOKEN');

export const actionSetUser = createAction<{
  userId: number;
  lastname: string;
  firstname: string;
  image: string;
}>('SET_USER');

export const actionSetCredentials = createAction<{
  name: 'email' | 'password';
  value: string;
}>('SET_CREDENTIALS');

export const actionChangeNewUser = createAction<{
  name: 'lastname' | 'firstname' | 'email' | 'password' | 'confirmPassword';
  value: string;
}>('CHANGE_NEW_USER');

export const actionIsLogged = createAction<{
  isLogged: boolean;
  userId: number;
  lastname: string;
  firstname: string;
  image: string;
}>('IS_LOGGED');

export const actionUserLogOut = createAction('USER_LOGOUT');

const authReducer = createReducer(userInitialState, (builder) => {
  builder
    .addCase(actionSetRefreshToken, (state, action) => {
      state.refreshToken = action.payload;
    })
    .addCase(actionRefreshToken.fulfilled, (state, action) => {
      console.log('fullfiled');

      addTokenJwtToAxiosInstance(action.payload);
      addAccessTokenToSessionStorage(action.payload);
    })
    .addCase(actionRefreshToken.rejected, (state, action) => {
      console.log('error');

      state.isLogged = false;
      state.user = {
        userId: 0,
        lastname: '',
        firstname: '',
        image: '',
      };
    })
    .addCase(actionSetUser, (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    })
    .addCase(actionSetCredentials, (state, action) => {
      state.credentials[action.payload.name] = action.payload.value;
    })
    .addCase(actionChangeNewUser, (state, action) => {
      state.newUser[action.payload.name] = action.payload.value;
    })
    .addCase(actionRegister.fulfilled, (state, action) => {
      state.credentials.email = state.newUser.email;
      state.credentials.password = state.newUser.password;
      state.message = action.payload.message;
      state.newUser = {
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    })
    .addCase(actionRegister.rejected, (state, action) => {
      state.message = action.error.message || 'error';
    })
    .addCase(actionCheckLogin.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isLogged = true;
      state.credentials = { email: '', password: '' };
    })
    .addCase(actionCheckLogin.rejected, (state, action) => {
      state.error = action.error.message || 'error';

      state.isLogged = false;
    })
    // .addCase(actionIsLogged, (state, action) => {
    //   console.log('je suis l action :', action.payload);
    //   console.log('je suis le state reducer :', state);

    //   if (action.payload) {
    //     state.isLogged = true;
    //     state.userId = action.payload.userId;
    //     state.lastname = action.payload.lastname;
    //     state.firstname = action.payload.firstname;
    //     state.image = action.payload.image;
    //     sessionStorage.setItem('user', JSON.stringify(action.payload));
    //   }
    // })
    .addCase(actionUserLogOut, (state) => {
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
});
export default authReducer;
