import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '..';
import axiosInstance from '../../axios/axios';

const actionSearchGames = createAsyncThunk(
  'games/SEARCH_GAMES',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.get(
      `/profile/${state.auth.user.userId}`
    );
    console.log('je suis la reponse du get de profile:', response);
    return response.data;
  }
);

export default actionSearchGames;
