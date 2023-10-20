import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	pageItems: [],
	activePage: 1,
	TOTAL_ITEMS_PER_PAGE: 15,
	MAX_PAGES_FOR_BASIC_PAGINATION: 10,
};

export const paginationSlice = createSlice({
	name: 'pagination',
	initialState,
	reducers: {
		setPageItems: (state, action) => {
			state.pageItems = action.payload;
		},
		setActivePage: (state, action) => {
			state.activePage = action.payload;
		},
	},
});

export const { setPageItems, setActivePage } = paginationSlice.actions;
export default paginationSlice.reducer;
