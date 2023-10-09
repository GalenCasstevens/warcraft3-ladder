import { createSlice } from '@reduxjs/toolkit';
import PlayerData from '../../data/PlayerData';

const initialState = {
	players: PlayerData.players,
};

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		setPlayers: (state, action) => {
			state.players = action.payload;
		},
	},
});

export const { setPlayers } = playerSlice.actions;
export default playerSlice.reducer;
