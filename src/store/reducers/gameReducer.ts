import { createAction, createReducer } from '@reduxjs/toolkit';
import { IGames, ILicenceOption } from '../../@Types/game';
import {
  actionDeleteGame,
  actionSearchGames,
  actionSearchGamesLicences,
} from '../thunks/gamesThunks';

export interface GameState {
  games: IGames[];
  gameId: number;
  licences: ILicenceOption[];
  error: string;
}

export const gameInitialState: GameState = {
  games: [],
  gameId: 0,
  licences: [],
  error: '',
};

export const actionSetGameId = createAction<number>('SET_GAME_ID');

export const actionSetGameUrl = createAction<{ gameUrl: string }>(
  'SET_GAME_URL'
);

const gameReducer = createReducer(gameInitialState, (builder) => {
  builder
    .addCase(actionSearchGames.fulfilled, (state, action) => {
      state.games = action.payload;
    })
    .addCase(actionSearchGames.rejected, (state, action) => {
      state.error = action.error.message || 'error';
    })
    .addCase(actionSetGameId, (state, action) => {
      state.gameId = action.payload;
    })
    .addCase(actionSearchGamesLicences.fulfilled, (state, action) => {
      state.licences = action.payload;
    })
    .addCase(actionSetGameUrl, (state, action) => {
      console.log('je suis l action :', action.payload);
      console.log('je suis le state reducer :', state);

      if (action.payload) {
        // state.gameUrl = action.payload.gameUrl;
      }
    })
    .addCase(actionDeleteGame.fulfilled, (state) => {
      const updatedGames = state.games.filter(
        (game) => game.id !== state.gameId
      );
      state.games = updatedGames;
    });
});

export default gameReducer;
