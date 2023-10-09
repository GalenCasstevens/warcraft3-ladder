import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	pageItems: [],
	active: 1,
	TOTAL_ITEMS_PER_PAGE: 15,
};

export const paginationSlice = createSlice({
	name: 'pagination',
	initialState,
	reducers: {
		setPageItems: (state, action) => {
			state.pageItems = action.payload;
		},
		setActive: (state, action) => {
			state.active = action.payload;
		},
	},
});

export const { setPageItems, setActive } = paginationSlice.actions;
export default paginationSlice.reducer;
