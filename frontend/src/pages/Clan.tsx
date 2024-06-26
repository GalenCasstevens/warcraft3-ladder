import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IPlayer } from '../interfaces/player.interface';
import { ClanRank } from '../enums/clanRank.enum';
import Pagination from '../components/BasicPagination';

const Clan = () => {
	const { clans } = useAppSelector((state) => state.clans);
	const { players } = useAppSelector((state) => state.players);
	const { clanId } = useParams();
	const clan = clans.find((x) => x._id === clanId);

	const compareRank = (player1: IPlayer, player2: IPlayer) => {
		const p1Rank = getPlayerRank(player1._id);
		const p2Rank = getPlayerRank(player2._id);
		if (p1Rank > p2Rank) return 1;
		else if (p1Rank < p2Rank) return -1;
		return 0;
	};

	const getPlayerRank = (playerId: string) => {
		const rank =
			clan?.players.find((x) => x.playerId === playerId)?.rank ?? ClanRank.Peon;
		return rank;
	};

	const [members, setMembers] = useState(
		players
			?.filter((x) => clan?.players.some((y) => y.playerId === x._id))
			.sort(compareRank)
	);

	const [playersPerPage, setPlayersPerPage] = useState(15);
	const [pageItems, setPageItems] = useState(members?.slice(0, playersPerPage));
	const [active, setActive] = useState(1);

	const paginate = (pageNumber: number) => {
		const startPlayerIndex = (pageNumber - 1) * playersPerPage;
		const endPlayerIndex = pageNumber * playersPerPage;
		setActive(pageNumber);
		setPageItems(members?.slice(startPlayerIndex, endPlayerIndex));
	};

	if (clan && clan !== null) {
		return (
			<>
				<div className="clan-page-container">
					<Row>
						<Col className="clan-back-btn-col">
							<BackButton />
						</Col>
						<Col>
							<h3 className="clan-page-title float-end align-bottom">
								<span className="clan-page-title-label">Clan:</span>{' '}
								<span className="clan-page-title-value">
									{clan.fullName} [{clan.name}]
								</span>
							</h3>
						</Col>
					</Row>
					<Table className="clan-table" striped bordered hover>
						<thead>
							<tr>
								<th className="clan-table-header">Rank</th>
								<th>Player Name</th>
								<th>Joined On</th>
								<th>Last Active</th>
							</tr>
						</thead>
						<tbody>
							{pageItems?.map((member) => (
								<tr className="clan-content-row">
									<td className="clan-icon-img-rank-cell">
										<Row>
											<Col lg={4}>
												<img
													className="float-start clan-icon-img"
													src={require(`../assets/icons/${ClanRank[
														getPlayerRank(member._id)
													].toLocaleLowerCase()}-icon.webp`)}
												/>
											</Col>
											<Col
												lg={8}
												className="align-center vertically-align-container"
											>
												<span className="clan-rank-text float-start">
													{ClanRank[getPlayerRank(member._id)]}
												</span>
											</Col>
										</Row>
									</td>
									<td className="clan-player-name-table-cell align-middle">
										<span className="float-start">
											<Link
												className="clan-player-name"
												to={`../players/${member._id}`}
											>
												{member.name}
											</Link>
										</span>
									</td>
									<td className="clan-join-date-table-cell align-middle">
										<span className="float-start">
											September 3, 2003 5:55 PM UTC
										</span>
									</td>
									<td className="align-middle">7 days, 2 hr, 5 min</td>
								</tr>
							))}
						</tbody>
					</Table>
					<div
						id="basic-pagination"
						style={{ display: 'flex', justifyContent: 'center' }}
					>
						<Pagination
							playersPerPage={15}
							totalPlayers={members?.length || 0}
							paginate={paginate}
							active={active}
						/>
					</div>
				</div>
			</>
		);
	}

	return <h1>No clan found.</h1>;
};

export default Clan;
