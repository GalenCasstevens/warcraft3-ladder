import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
	setPageItems,
	setActive,
} from '../features/pagination/paginationSlice';
import BSPagination from 'react-bootstrap/Pagination';

function Pagination() {
	const { players } = useAppSelector((state) => state.players);
	const { active } = useAppSelector((state) => state.pagination);
	const { TOTAL_ITEMS_PER_PAGE } = useAppSelector((state) => state.pagination);
	const totalPages = Math.ceil(players.length / TOTAL_ITEMS_PER_PAGE);
	let items = [];

	const dispatch = useDispatch();

	const paginate = (number: number) => {
		const startInd = (number - 1) * TOTAL_ITEMS_PER_PAGE;
		const endInd = number * TOTAL_ITEMS_PER_PAGE;
		dispatch(setActive(number));
		dispatch(setPageItems(players.slice(startInd, endInd)));
	};

	for (let number = 1; number <= totalPages; number++) {
		items.push(
			<span onClick={() => paginate(number)}>
				<BSPagination.Item key={number} active={number === active}>
					{number}
				</BSPagination.Item>
			</span>
		);
	}
	return <BSPagination>{items}</BSPagination>;
}

export default Pagination;
