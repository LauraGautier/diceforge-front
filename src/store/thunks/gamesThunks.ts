import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '..';
import axiosInstance from '../../axios/axios';
// import { addTokenAndPseudoToLocalStorage } from '../../localStorage/localStorage';

const actionSearchGames = createAsyncThunk(
  'games/SEARCH_GAMES',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.get(
      `/profile/${state.auth.user.userId}`
    );
    const games = response.data;
    console.log('je suis la reponse du get de profile', response);
    return games;
  }
);

const actionDeleteGame = createAsyncThunk(
  'game/DELETE_GAME',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    await axiosInstance.delete(`/game/${state.game.gameId}`);
  }
);

const actionSearchGamesLicences = createAsyncThunk(
  'game/SEARCH_GAMES_LICENCES',
  async () => {
    const response = await axiosInstance.get('/license');
    console.log('je suis la reponse du get licences', response);

    return response.data;
  }
);

const actionPostGame = createAsyncThunk('game/POST_GAME', async () => {
  const response = await axiosInstance.post('/game', {
    name: title,
    license_name: licences,
    email: email,
  });
});

export { actionDeleteGame, actionSearchGames, actionSearchGamesLicences };
