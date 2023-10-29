import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setPlayers } from '../features/players/playerSlice';
import { setPageItems } from '../features/pagination/paginationSlice';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Pagination from '../components/Pagination';
import { IPlayer } from '../interfaces/player.interface';
import { ordinalSuffixOf } from '../helpers/Utils';

const Leaderboard = () => {
	const { players } = useAppSelector((state) => state.players);
	const { clans } = useAppSelector((state) => state.clans);
	const { activePage } = useAppSelector((state) => state.pagination);
	const { pageItems, TOTAL_ITEMS_PER_PAGE } = useAppSelector(
		(state) => state.pagination
	);
	const XP_PROGRESS_FACTOR = 0.22;
	const XP_GAINED_ON_WIN_FACTOR = 100;
	const XP_LOST_ON_LOSE_FACTOR = 25;
	const XP_LOST_EXPONENT_BASE = 1.01;
	const XP_LOST_MAX = 85;

	const dispatch = useAppDispatch();

	useEffect(() => {
		const sortedPlayers = players?.slice().sort(compareXp);
		dispatch(setPlayers(sortedPlayers));
		dispatch(setPageItems(sortedPlayers?.slice(0, TOTAL_ITEMS_PER_PAGE)));
	}, [dispatch]);

	const compareXp = (player1: IPlayer, player2: IPlayer) => {
		const p1Xp = calcXp(player1.wins, player1.losses);
		const p2Xp = calcXp(player2.wins, player2.losses);
		if (p1Xp > p2Xp) return -1;
		if (p1Xp < p2Xp) return 1;
		return 0;
	};

	const paginatedIndex = (ind: number) => {
		const realInd = ind + 1;
		const paginationFactor = activePage - 1;
		return realInd + paginationFactor * TOTAL_ITEMS_PER_PAGE;
	};

	const calcLvlProgressPercent = (xp: number) => {
		const xpTowardsNext = xp - calcTotalXpReqForCurrLvl(xp);
		const xpReqForCurr =
			calcTotalXpReqForNextLvl(xp) - calcTotalXpReqForCurrLvl(xp);
		const progressPercent = Math.round(
			(xpTowardsNext / xpReqForCurr + Number.EPSILON) * 100
		);
		return progressPercent;
	};

	const calcTotalXpReqForCurrLvl = (xp: number) => {
		const currLevel = calcLevel(xp);
		const xpRequired = Math.pow(currLevel / XP_PROGRESS_FACTOR, 2);
		return xpRequired;
	};

	const calcTotalXpReqForNextLvl = (xp: number) => {
		const currLevel = calcLevel(xp);
		const nextLevel = currLevel + 1;
		const xpRequired = Math.pow(nextLevel / XP_PROGRESS_FACTOR, 2);
		return xpRequired;
	};

	const calcXp = (wins: number, losses: number) => {
		const xpFromWins = Math.floor(wins * XP_GAINED_ON_WIN_FACTOR);
		let xpFromLosses = Math.floor(
			losses *
				XP_LOST_ON_LOSE_FACTOR *
				Math.pow(XP_LOST_EXPONENT_BASE, calcLevel(xpFromWins))
		);
		if (xpFromLosses > XP_LOST_MAX) xpFromLosses = XP_LOST_MAX;
		const xpNetGain = xpFromWins - xpFromLosses;
		return xpNetGain;
	};

	const calcLevel = (xp: number) => {
		const level = Math.floor(XP_PROGRESS_FACTOR * Math.sqrt(xp));
		return level;
	};

	const numberWithCommas = (num: number) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	const getClanId = (clanName: string) => {
		return clans.find((clan) => clan.name === clanName)?._id;
	};

	const playerInClan = (playerId: string) => {
		let result = false;
		clans.map((clan) => {
			if (clan.players.some((player) => player.playerId === playerId))
				result = true;
		});
		return result;
	};

	const getPlayerClan = (playerId: string) => {
		let clanName = '';
		clans.map((clan) => {
			if (clan.players.some((player) => player.playerId === playerId))
				clanName = clan.name;
		});
		return clanName;
	};

	if (pageItems && pageItems !== null) {
		return (
			<>
				{/* <BackButton /> */}
				<Table className="leaderboard" striped responsive>
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
						{pageItems.map((player: IPlayer, ind: number) => (
							<tr>
								<td>{ordinalSuffixOf(paginatedIndex(ind))}</td>
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
								<td className="clan-col">
									{playerInClan(player._id) && (
										<Link
											className="leaderboard-clan-name"
											to={`clans/${getClanId(getPlayerClan(player._id))}`}
										>
											{getPlayerClan(player._id)}
										</Link>
									)}
								</td>
								<td className="icon-img-cell align-middle">
									<img
										className="icon-img"
										src={require(`../assets/icons/${player.icon}-icon.webp`)}
									/>
								</td>
								<td className="player-name-col" colSpan={2}>
									<Link
										className="leaderboard-player-name"
										to={`players/${player._id}`}
									>
										{player.name}
									</Link>
								</td>
								<td>{numberWithCommas(calcXp(player.wins, player.losses))}</td>
								<td>{player.wins}</td>
								<td>{player.losses}</td>
							</tr>
						))}
					</tbody>
				</Table>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Pagination />
				</div>
			</>
		);
	}

	return <h1 style={{ color: '#fff' }}>An unexpected error occurred.</h1>;
};

export default Leaderboard;
