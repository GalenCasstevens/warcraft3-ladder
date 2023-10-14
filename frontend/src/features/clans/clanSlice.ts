import { createSlice } from '@reduxjs/toolkit';
import ClanData from '../../data/ClanData';

const initialState = {
	clans: ClanData.clans,
};

export const clanSlice = createSlice({
	name: 'clan',
	initialState,
	reducers: {},
});

export default clanSlice.reducer;
