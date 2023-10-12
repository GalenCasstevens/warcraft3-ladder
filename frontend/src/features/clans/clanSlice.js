import { createSlice } from '@reduxjs/toolkit';
import ClanData from '../../data/ClanData';

const initialState = {
	clans: ClanData.clans,
};

export const clanSlice = createSlice({
	name: 'clan',
	initialState,
});

export const { setClans } = clanSlice.actions;
export default clanSlice.reducer;
