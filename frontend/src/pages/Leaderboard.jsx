import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';

import PlayerData from '../data/PlayerData';

function Leaderboard() {
	const [players, setPlayers] = useState([]);
	const XP_PROGRESS_FACTOR = 0.22;
	const XP_GAINED_ON_WIN_FACTOR = 100;
	const XP_LOST_ON_LOSE_FACTOR = 25;
	const XP_LOST_EXPONENT_BASE = 1.01;
	const XP_LOST_MAX = 85;

	useEffect(() => {
		setPlayers(PlayerData.players.sort(compareXp));
	}, []);

	const compareXp = (player1, player2) => {
		const p1Xp = calcXp(player1.wins, player1.losses);
		const p2Xp = calcXp(player2.wins, player2.losses);
		if (p1Xp > p2Xp) return -1;
		if (p1Xp < p2Xp) return 1;
		return 0;
	};

	const ordinalSuffixOf = (n) => {
		var j = n % 10;
		var k = n % 100;
		if (j == 1 && k != 11)
			return (
				<>
					{n}
					<sup>st</sup>
				</>
			);
		if (j == 2 && k != 12)
			return (
				<>
					{n}
					<sup>nd</sup>
				</>
			);
		if (j == 3 && k != 13)
			<>
				{n}
				<sup>rd</sup>
			</>;
		return (
			<>
				{n}
				<sup>th</sup>
			</>
		);
	};

	const calcLvlProgressPercent = (xp) => {
		const xpTowardsNext = xp - calcTotalXpReqForCurrLvl(xp);
		const xpReqForCurr =
			calcTotalXpReqForNextLvl(xp) - calcTotalXpReqForCurrLvl(xp);
		const progressPercent = Math.round(
			(xpTowardsNext / xpReqForCurr + Number.EPSILON) * 100
		);
		return progressPercent;
	};

	const calcTotalXpReqForCurrLvl = (xp) => {
		const currLevel = calcLevel(xp);
		const xpRequired = Math.pow(currLevel / XP_PROGRESS_FACTOR, 2);
		return xpRequired;
	};

	const calcTotalXpReqForNextLvl = (xp) => {
		const currLevel = calcLevel(xp);
		const nextLevel = currLevel + 1;
		const xpRequired = Math.pow(nextLevel / XP_PROGRESS_FACTOR, 2);
		return xpRequired;
	};

	const calcXp = (wins, losses) => {
		const xpFromWins = wins * XP_GAINED_ON_WIN_FACTOR;
		let xpFromLosses =
			losses *
			XP_LOST_ON_LOSE_FACTOR *
			Math.pow(XP_LOST_EXPONENT_BASE, calcLevel(xpFromWins));
		if (xpFromLosses > XP_LOST_MAX) xpFromLosses = XP_LOST_MAX;
		const xpNetGain = xpFromWins - xpFromLosses;
		return xpNetGain;
	};

	const calcLevel = (xp) => {
		const level = Math.floor(XP_PROGRESS_FACTOR * Math.sqrt(xp));
		return level;
	};

	const numberWithCommas = (num) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	if (players && players !== null) {
		return (
			<>
				<Table striped responsive>
					<thead>
						<tr>
							<th>Rank</th>
							<th>Level</th>
							<th>Clan</th>
							<th>Race</th>
							<th className="player-name-col" colSpan={2}>
								Player Name
							</th>
							<th>XP</th>
							<th>Wins</th>
							<th>Losses</th>
						</tr>
					</thead>
					<tbody>
						{players.map((player, index) => (
							<tr>
								<td>{ordinalSuffixOf(index + 1)}</td>
								<td className="align-middle">
									<div className="level-container">
										<ProgressBar
											now={calcLvlProgressPercent(
												calcXp(player.wins, player.losses)
											)}
										/>
										<span className="level-num">
											{calcLevel(calcXp(player.wins, player.losses))}
										</span>
									</div>
								</td>
								<td className="clan-col">{player.clan}</td>
								<td className="icon-img-cell align-middle">
									<img
										className="icon-img"
										src={require(`../assets/${player.icon}`)}
									/>
								</td>
								<td className="player-name-col" colSpan={2}>
									{player.name}
								</td>
								<td>{numberWithCommas(calcXp(player.wins, player.losses))}</td>
								<td>{player.wins}</td>
								<td>{player.losses}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</>
		);
	}

	return <h1>An unexpected error occurred.</h1>;
}

export default Leaderboard;
