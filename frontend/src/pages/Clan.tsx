import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IPlayer } from '../interfaces/player.interface';
import { ClanRank } from '../enums/clanRank.enum';

const Clan: React.FC = () => {
	const { clans } = useAppSelector((state) => state.clans);
	const { players } = useAppSelector((state) => state.players);
	const { clanId } = useParams();
	const clan = clans.find((x) => x._id === clanId);

	const getPlayerRank = (playerId: string) => {
		const rank =
			clan?.players.find((x) => x.playerId === playerId)?.rank ?? ClanRank.Peon;
		return rank;
	};

	const compareRank = (player1: IPlayer, player2: IPlayer) => {
		const p1Rank: number = getPlayerRank(player1._id);
		const p2Rank: number = getPlayerRank(player2._id);
		if (p1Rank > p2Rank) return 1;
		else if (p1Rank < p2Rank) return -1;
		return 0;
	};

	const members = players
		?.filter((x) => clan?.players.some((y) => y.playerId === x._id))
		.sort(compareRank);

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
							{members?.map((member) => (
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
										<span className="float-start">{member.name}</span>
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
				</div>
			</>
		);
	}

	return <h1>No clan found.</h1>;
};

export default Clan;
