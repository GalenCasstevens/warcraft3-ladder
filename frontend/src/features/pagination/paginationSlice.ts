import { createSlice } from '@reduxjs/toolkit';
const TOTAL_ITEMS_PER_PAGE = 15;

const initialState = {
	pageItems: [],
	activePage: 1,
	TOTAL_ITEMS_PER_PAGE: TOTAL_ITEMS_PER_PAGE,
	MAX_PAGES_FOR_BASIC_PAGINATION: 10,
	startInd: 0,
	endInd: TOTAL_ITEMS_PER_PAGE,
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
		setStartInd: (state, action) => {
			state.startInd = action.payload;
		},
		setEndInd: (state, action) => {
			state.endInd = action.payload;
		},
	},
});

export const { setPageItems, setActivePage, setStartInd, setEndInd } =
	paginationSlice.actions;
export default paginationSlice.reducer;
