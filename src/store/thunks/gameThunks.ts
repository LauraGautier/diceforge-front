import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '..';
import axiosInstance from '../../axios/axios';
// import { addTokenAndPseudoToLocalStorage } from '../../localStorage/localStorage';

const actionSearchGames = createAsyncThunk(
  'game/SEARCH_GAMES',
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

const actionPostGame = createAsyncThunk(
  'game/POST_GAME',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const response = await axiosInstance.post('/game', {
      name: state.game.gameDatas.name,
      license_name: state.game.gameDatas.license_name,
      email: state.game.gameDatas.email,
    });
    console.log('je suis la reponse du post de game', response);
    const createdGame = { createdGame: response.data };
    console.log('je suis createdGame :', createdGame);

    return createdGame;
  }
);

const actionGetGameById = createAsyncThunk(
  'game/GET_GAME_BY_ID',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    console.log(
      'je suis le state de currentGame.id dans le thunk',
      state.game.currentGame.id
    );

    let gameId = state.game.currentGame.id;

    if (gameId === 0) {
      gameId = state.game.gameId 
    }

    const response = await axiosInstance.get(
      `/game/${gameId}`
    );
    const gameSearched = response.data;
    console.log(gameSearched);

    return gameSearched;
  }
);
export {
  actionDeleteGame,
  actionGetGameById,
  actionPostGame,
  actionSearchGames,
  actionSearchGamesLicences
};

