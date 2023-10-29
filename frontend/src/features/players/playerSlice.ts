import { createSlice } from '@reduxjs/toolkit';
import PlayerData from '../../data/PlayerData';
import { IPlayer } from '../../interfaces/player.interface';

interface IInitialState {
	players: IPlayer[] | null;
	player: IPlayer | undefined;
}

const initialState: IInitialState = {
	players: PlayerData.players,
	player: undefined,
};

export const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		getPlayer: (state, action) => {
			state.player = state.players?.find(
				(x: IPlayer) => x._id === action.payload
			);
		},
		setPlayers: (state, action) => {
			state.players = action.payload;
		},
	},
});

export const { getPlayer, setPlayers } = playerSlice.actions;
export default playerSlice.reducer;
