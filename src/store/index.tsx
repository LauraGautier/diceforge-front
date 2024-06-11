import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import gameReducer from './reducers/gameReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
