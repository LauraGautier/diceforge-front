import { createAction, createReducer } from '@reduxjs/toolkit';
import { IGames } from '../../@Types/game';
import { actionSearchGames } from '../thunks/gamesThunks';

export interface GameState {
  games: IGames[];
}

export const gameInitialState: GameState = {
  games: [],
};

export const actionSetGameId = createAction<{ gameId: number }>('SET_GAME_ID');

export const actionSetGameUrl = createAction<{ gameUrl: string }>(
  'SET_GAME_URL'
);

const gameReducer = createReducer(gameInitialState, (builder) => {
  builder
    .addCase(actionSearchGames.fulfilled, (state, action) => {
      state.games = action.payload;
    })
    .addCase(actionSetGameUrl, (state, action) => {
      console.log('je suis laction:', action.payload);
      console.log('je suis le state:', state);
      if (action.payload) {
        // state.gameUrl = action.payload.gameUrl;
      }
    });
});

export default gameReducer;
