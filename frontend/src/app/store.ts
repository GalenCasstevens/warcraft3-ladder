import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../features/players/playerSlice';
import paginationReducer from '../features/pagination/paginationSlice';
import clanReducer from '../features/clans/clanSlice';

export const store = configureStore({
	reducer: {
		players: playerReducer,
		pagination: paginationReducer,
		clans: clanReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
