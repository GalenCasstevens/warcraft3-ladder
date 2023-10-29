import { createSlice } from '@reduxjs/toolkit';
import ClanData from '../../data/ClanData';

const initialState = {
	clans: ClanData.clans,
	clanId: '',
};

export const clanSlice = createSlice({
	name: 'clan',
	initialState,
	reducers: {
		getClanId: (state, action) => {
			const clanName = action.payload;
			state.clanId =
				state.clans.find((clan) => clan.name === clanName)?._id ?? '';
		},
	},
});

export const { getClanId } = clanSlice.actions;
export default clanSlice.reducer;
