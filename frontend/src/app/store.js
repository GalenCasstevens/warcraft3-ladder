import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../features/players/playerSlice';
import paginationReducer from '../features/pagination/paginationSlice';

export const store = configureStore({
	reducer: {
		players: playerReducer,
		pagination: paginationReducer,
	},
});
