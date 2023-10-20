import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
	setPageItems,
	setActivePage,
} from '../features/pagination/paginationSlice';
import BSPagination from 'react-bootstrap/Pagination';

const Pagination = () => {
	const { players } = useAppSelector((state) => state.players);
	const { activePage, TOTAL_ITEMS_PER_PAGE } = useAppSelector(
		(state) => state.pagination
	);
	const TOTAL_PAGES = Math.ceil(players.length / TOTAL_ITEMS_PER_PAGE);
	const isCurrentPageFirst = activePage === 1;
	const isCurrentPageLast = activePage === TOTAL_PAGES;
	let isPageNumberOutOfRange: boolean;
	let items = [];

	const dispatch = useAppDispatch();

	const paginate = (currentPage: number) => {
		if (activePage === currentPage) return;
		const startInd = (currentPage - 1) * TOTAL_ITEMS_PER_PAGE;
		const endInd = currentPage * TOTAL_ITEMS_PER_PAGE;
		dispatch(setActivePage(currentPage));
		dispatch(setPageItems(players.slice(startInd, endInd)));
	};

	const onFirstPageClick = () => {
		paginate(1);
	};

	const onPreviousPageClick = () => {
		paginate(activePage - 1);
	};

	const onNextPageClick = () => {
		paginate(activePage + 1);
	};

	const onLastPageClick = () => {
		paginate(TOTAL_PAGES);
	};

	const setLastPageAsCurrent = () => {
		if (activePage > TOTAL_PAGES) {
			dispatch(setActivePage(TOTAL_PAGES));
		}
	};

	useEffect(setLastPageAsCurrent, [TOTAL_PAGES]);

	const pageNumbers = [...new Array(TOTAL_PAGES)].map((_, index) => {
		const pageNumber = index + 1;
		const isPageNumberFirst = pageNumber === 1;
		const isPageNumberLast = pageNumber === TOTAL_PAGES;
		const isCurrentPageWithinTwoPageNumbers =
			Math.abs(pageNumber - activePage) <= 2;
		const isPageDivisibleByTen = pageNumber % 10 === 0;

		if (
			isPageNumberFirst ||
			isPageNumberLast ||
			isCurrentPageWithinTwoPageNumbers
		) {
			return (
				<BSPagination.Item
					key={pageNumber}
					onClick={() => paginate(pageNumber)}
					active={pageNumber === activePage}
				>
					{pageNumber}
				</BSPagination.Item>
			);
		}

		if (isPageDivisibleByTen) {
			return (
				<BSPagination.Item
					key={pageNumber}
					onClick={() => paginate(pageNumber)}
					active={pageNumber === activePage}
				>
					{pageNumber}
				</BSPagination.Item>
			);
		}

		// if (!isPageNumberOutOfRange) {
		// 	isPageNumberOutOfRange = true;
		// 	return <BSPagination.Ellipsis key={pageNumber} className="muted" />;
		// }

		return null;
	});

	return (
		<>
			<BSPagination>
				<BSPagination.First
					onClick={onFirstPageClick}
					disabled={isCurrentPageFirst}
				/>
				<BSPagination.Prev
					onClick={onPreviousPageClick}
					disabled={isCurrentPageFirst}
				/>
				{pageNumbers}
				<BSPagination.Next
					onClick={onNextPageClick}
					disabled={isCurrentPageLast}
				/>
				<BSPagination.Last
					onClick={onLastPageClick}
					disabled={isCurrentPageLast}
				/>
			</BSPagination>
		</>
	);
};

export default Pagination;
