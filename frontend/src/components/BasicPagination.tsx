import BSPagination from 'react-bootstrap/Pagination';

function Pagination({
	playersPerPage,
	totalPlayers,
	paginate,
	active,
}: {
	playersPerPage: number;
	totalPlayers: number;
	paginate: CallableFunction;
	active: number;
}) {
	const items = [];

	for (let i = 1; i <= Math.ceil(totalPlayers / playersPerPage); i++) {
		items.push(
			<span onClick={() => paginate(i)}>
				<BSPagination.Item key={i} active={i === active}>
					{i}
				</BSPagination.Item>
			</span>
		);
	}

	return <BSPagination>{items}</BSPagination>;
}

export default Pagination;
