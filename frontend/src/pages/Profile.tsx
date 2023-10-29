import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useParams } from 'react-router-dom';
import { getPlayer } from '../features/players/playerSlice';
import BackButton from '../components/BackButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Profile: React.FC = () => {
	const { player } = useAppSelector((state) => state.players);
	const { clans } = useAppSelector((state) => state.clans);
	const { playerId } = useParams();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getPlayer(playerId));
	}, [dispatch, playerId]);

	const getPlayerClan = (playerId: string) => {
		let clanName = '';
		clans.map((clan) => {
			if (clan.players.some((player) => player.playerId === playerId))
				clanName = clan.name;
		});
		return clanName;
	};

	if (player || player !== null) {
		return (
			<>
				<BackButton />
				<div className="profile-container">
					<Row>
						<Col className="profile-info-stats-col" lg={4}>
							<Row>
								<Col md={6}>
									<img
										className="profile-img"
										src={require(`../assets/profile-img/${
											player?.icon ?? 'peon'
										}-profile.gif`)}
									/>
								</Col>
								<Col className="profile-name-col" md={6}>
									<div className="profile-name-container">
										<Row>
											<p className="profile-info-label">Player Name:</p>
											<p className="profile-info-value">{player?.name}</p>
										</Row>
										<Row>
											<p className="profile-info-label">Clan Name:</p>
											<p className="profile-info-value">
												<span className="profile-clan">
													{getPlayerClan(player?._id ?? '')}
												</span>
											</p>
										</Row>
									</div>
								</Col>
							</Row>
							<Row className="profile-player-info-row">
								<Row>
									<p className="profile-info-label">Homepage:</p>
									<p className="profile-info-value">
										www.sickreplays.com/{player?.name.toLowerCase()}
									</p>
								</Row>
								<Row>
									<p className="profile-info-label">Additional Information:</p>
									<p className="profile-info-value">
										Lessons for $100/hr - paypal: @{player?.name.toLowerCase()}
									</p>
								</Row>
								<Row>
									<p className="profile-info-label">Last Ladder Game:</p>
									<p className="profile-info-value">
										Thursday, April 10, 2003 7:53 PM UTC
									</p>
								</Row>
							</Row>
							<Row>
								<p className="profile-info-label">Play History:</p>
								<Col lg={9} md={12}>
									<Table className="profile-stats" striped bordered hover>
										<thead>
											<tr>
												<th className="race-total-header"></th>
												<th className="wins-losses-header">Wins</th>
												<th className="wins-losses-header">Losses</th>
												<th className="wins-losses-header">Win %</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="profile-stats-header">Random:</td>
												<td className="profile-stats-content">27</td>
												<td className="profile-stats-content">9</td>
												<td className="profile-stats-content">75.00%</td>
											</tr>
											<tr>
												<td className="profile-stats-header">Human:</td>
												<td className="profile-stats-content">771</td>
												<td className="profile-stats-content">553</td>
												<td className="profile-stats-content">58.23%</td>
											</tr>
											<tr>
												<td className="profile-stats-header">Orc:</td>
												<td className="profile-stats-content">156</td>
												<td className="profile-stats-content">153</td>
												<td className="profile-stats-content">50.49%</td>
											</tr>
											<tr>
												<td className="profile-stats-header">Undead:</td>
												<td className="profile-stats-content">35</td>
												<td className="profile-stats-content">17</td>
												<td className="profile-stats-content">67.31%</td>
											</tr>
											<tr>
												<td className="profile-stats-header">Night Elf:</td>
												<td className="profile-stats-content">80</td>
												<td className="profile-stats-content">45</td>
												<td className="profile-stats-content">64.00%</td>
											</tr>
											<tr className="profile-stats-total">
												<td className="profile-stats-header">Total:</td>
												<td className="profile-stats-content">1069</td>
												<td className="profile-stats-content">777</td>
												<td className="profile-stats-content">57.92%</td>
											</tr>
										</tbody>
									</Table>
								</Col>
							</Row>
						</Col>
						<Col className="profile-breakdown-col text-center" lg={4}>
							<div className="profile-breakdown-container">
								<Row className="profile-breakdown-main-row">
									<Col>
										<Row className="profile-breakdown-header-progress-bar">
											<p className="breakdown-header">Solo Games</p>
											<div className="level-container">
												<ProgressBar
													className="profile-progress-bar"
													now={50}
												/>
												<span className="level-num align-middle">
													Level {90}
												</span>
											</div>
											<Row className="level-indicators">
												<Col xs={4}>
													<div className="float-start">
														<span className="first-indicator">89</span>
													</div>
												</Col>
												<Col xs={4}>
													<div className="text-center">
														<span className="middle-indicator">90</span>
													</div>
												</Col>
												<Col xs={4} className="last-indicator-col">
													<div className="float-end">
														<span className="last-indicator">91</span>
													</div>
												</Col>
											</Row>
										</Row>
										<hr id="profile-hr" />
										<Row>
											<Col>
												<Row>
													<Col>
														<p className="profile-breakdown-label float-start">
															Exp:
														</p>
													</Col>
													<Col>
														<p className="profile-breakdown-value float-end">
															16,504
														</p>
													</Col>
												</Row>
												<Row>
													<Col>
														<p className="profile-breakdown-label float-start">
															Wins:
														</p>
													</Col>
													<Col>
														<p className="profile-breakdown-value float-end">
															296
														</p>
													</Col>
												</Row>
												<Row>
													<Col>
														<p className="profile-breakdown-label float-start">
															Losses:
														</p>
													</Col>
													<Col>
														<p className="profile-breakdown-value float-end">
															96
														</p>
													</Col>
												</Row>
											</Col>
											<Col>
												<Row>
													<p className="profile-breakdown-rank">
														<div className="align-middle profile-breakdown-rank-container">
															<span className="profile-breakdown-label">
																Rank:
															</span>{' '}
															<span className="profile-breakdown-value profile-rank">
																4<sup className="sup-profile-rank">th</sup>
															</span>
														</div>
													</p>
												</Row>
												<Row>
													<p className="profile-breakdown-xp-decay">
														<span className="profile">
															<span className="profile-breakdown-label">
																XP decay
																<span className="responsive-remove"> in</span>:
															</span>{' '}
															<span className="profile-breakdown-value">
																8 days
															</span>
														</span>
													</p>
												</Row>
											</Col>
										</Row>
									</Col>
								</Row>
								<Row className="profile-breakdown-main-row">
									<Col>
										<Row className="profile-breakdown-header-progress-bar">
											<p className="breakdown-header">Random Team Games</p>
											<div className="level-container">
												<ProgressBar
													className="profile-progress-bar"
													now={50}
												/>
												<span className="level-num align-middle">
													Level {44}
												</span>
											</div>
											<Row className="level-indicators">
												<Col xs={4}>
													<div className="float-start">
														<span className="first-indicator">43</span>
													</div>
												</Col>
												<Col xs={4}>
													<div className="text-center">
														<span className="middle-indicator">44</span>
													</div>
												</Col>
												<Col xs={4} className="last-indicator-col">
													<div className="float-end">
														<span className="last-indicator">45</span>
													</div>
												</Col>
											</Row>
										</Row>
										<hr id="profile-hr" />
										<Row>
											<Col>
												<Row>
													<Col>
														<p className="profile-breakdown-label float-start">
															Exp:
														</p>
													</Col>
													<Col>
														<p className="profile-breakdown-value float-end">
															10,394
														</p>
													</Col>
												</Row>
												<Row>
													<Col>
														<p className="profile-breakdown-label float-start">
															Wins:
														</p>
													</Col>
													<Col>
														<p className="profile-breakdown-value float-end">
															120
														</p>
													</Col>
												</Row>
												<Row>
													<Col>
														<p className="profile-breakdown-label float-start">
															Losses:
														</p>
													</Col>
													<Col>
														<p className="profile-breakdown-value float-end">
															16
														</p>
													</Col>
												</Row>
											</Col>
											<Col>
												<Row>
													<p className="profile-breakdown-rank">
														<div className="align-middle profile-breakdown-rank-container">
															<span className="profile-breakdown-label">
																Rank:
															</span>{' '}
															<span className="profile-breakdown-value profile-rank">
																4<sup className="sup-profile-rank">th</sup>
															</span>
														</div>
													</p>
												</Row>
												<Row>
													<p className="profile-breakdown-xp-decay">
														<span className="profile">
															<span className="profile-breakdown-label">
																XP decay
																<span className="responsive-remove"> in</span>:
															</span>{' '}
															<span className="profile-breakdown-value">
																3 days
															</span>
														</span>
													</p>
												</Row>
											</Col>
										</Row>
									</Col>
								</Row>
							</div>
						</Col>
						<Col className="profile-at-col text-center" lg={4}>
							<div className="profile-at-container">
								<Row>
									<p className="breakdown-header">Arranged Teams</p>
								</Row>
								<div className="profile-at-games">
									<Row className="profile-at-main-row">
										<Col>
											<Row>
												<Col>
													<div className="level-container">
														<ProgressBar
															className="profile-progress-bar"
															now={40}
														/>
														<span className="level-num align-middle">
															Level {8}
														</span>
													</div>
												</Col>
												<Col>
													<Row>
														<Col>
															<div className="float-start">
																<p className="profile-at-label">Wins:</p>
															</div>
														</Col>
														<Col>
															<div className="float-end">
																<p className="profile-at-value">10</p>
															</div>
														</Col>
													</Row>
													<Row>
														<Col>
															<div className="float-start">
																<p className="profile-at-label">Losses:</p>
															</div>
														</Col>
														<Col>
															<div className="float-end">
																<p className="profile-at-value">0</p>
															</div>
														</Col>
													</Row>
												</Col>
											</Row>
											<Row className="profile-at-partners-rank-row">
												<Col>
													<div className="float-start">
														<p className="profile-at-label">Partner(s):</p>
														<p className="profile-at-value profile-partners float-start">
															Solar
														</p>
													</div>
												</Col>
												<Col>
													<div className="profile-at-rank-container">
														<p className="profile-at-label">Rank:</p>
														<p className="profile-rank">
															8<sup className="sup-profile-rank">th</sup>
														</p>
													</div>
												</Col>
											</Row>
										</Col>
									</Row>
									<Row className="profile-at-main-row">
										<Col>
											<Row>
												<Col>
													<div className="level-container">
														<ProgressBar
															className="profile-progress-bar"
															now={75}
														/>
														<span className="level-num align-middle">
															Level {6}
														</span>
													</div>
												</Col>
												<Col>
													<Row>
														<Col>
															<div className="float-start">
																<p className="profile-at-label">Wins:</p>
															</div>
														</Col>
														<Col>
															<div className="float-end">
																<p className="profile-at-value">6</p>
															</div>
														</Col>
													</Row>
													<Row>
														<Col>
															<div className="float-start">
																<p className="profile-at-label">Losses:</p>
															</div>
														</Col>
														<Col>
															<div className="float-end">
																<p className="profile-at-value">0</p>
															</div>
														</Col>
													</Row>
												</Col>
											</Row>
											<Row className="profile-at-partners-rank-row">
												<Col>
													<div className="float-start">
														<p className="profile-at-label">Partner(s):</p>
														<p className="profile-at-value profile-partners float-start">
															Phoniex_Rize
														</p>
													</div>
												</Col>
												<Col>
													<div className="profile-at-rank-container">
														<p className="profile-at-label">Rank:</p>
														<p className="profile-rank">
															844<sup className="sup-profile-rank">th</sup>
														</p>
													</div>
												</Col>
											</Row>
										</Col>
									</Row>
									<Row className="profile-at-main-row">
										<Col>
											<Row>
												<Col>
													<div className="level-container">
														<ProgressBar
															className="profile-progress-bar"
															now={10}
														/>
														<span className="level-num align-middle">
															Level {3}
														</span>
													</div>
												</Col>
												<Col>
													<Row>
														<Col>
															<div className="float-start">
																<p className="profile-at-label">Wins:</p>
															</div>
														</Col>
														<Col>
															<div className="float-end">
																<p className="profile-at-value">1</p>
															</div>
														</Col>
													</Row>
													<Row>
														<Col>
															<div className="float-start">
																<p className="profile-at-label">Losses:</p>
															</div>
														</Col>
														<Col>
															<div className="float-end">
																<p className="profile-at-value">0</p>
															</div>
														</Col>
													</Row>
												</Col>
											</Row>
											<Row className="profile-at-partners-rank-row">
												<Col>
													<div className="float-start">
														<p className="profile-at-label">Partner(s):</p>
														<p className="profile-at-value profile-partners float-start">
															Galen
														</p>
													</div>
												</Col>
												<Col>
													<div className="profile-at-rank-container">
														<p className="profile-at-label">Rank:</p>
														<p className="profile-rank">
															8<sup className="sup-profile-rank">th</sup>
														</p>
													</div>
												</Col>
											</Row>
										</Col>
									</Row>
									<Row className="profile-at-main-row">
										<Col>
											<Row>
												<Col>
													<div className="level-container">
														<ProgressBar
															className="profile-progress-bar"
															now={75}
														/>
														<span className="level-num align-middle">
															Level {3}
														</span>
													</div>
												</Col>
												<Col>
													<Row>
														<Col>
															<div className="float-start">
																<p className="profile-at-label">Wins:</p>
															</div>
														</Col>
														<Col>
															<div className="float-end">
																<p className="profile-at-value">2</p>
															</div>
														</Col>
													</Row>
													<Row>
														<Col>
															<div className="float-start">
																<p className="profile-at-label">Losses:</p>
															</div>
														</Col>
														<Col>
															<div className="float-end">
																<p className="profile-at-value">0</p>
															</div>
														</Col>
													</Row>
												</Col>
											</Row>
											<Row className="profile-at-partners-rank-row">
												<Col>
													<div className="float-start">
														<p className="profile-at-label">Partner(s):</p>
														<p className="profile-at-value profile-partners float-start">
															Vergil
														</p>
													</div>
												</Col>
												<Col>
													<div className="profile-at-rank-container">
														<p className="profile-at-label">Rank:</p>
														<p>Unranked</p>
													</div>
												</Col>
											</Row>
										</Col>
									</Row>
									<Row className="profile-at-main-row">
										<Col>
											<Row>
												<Col>
													<div className="level-container">
														<ProgressBar
															className="profile-progress-bar"
															now={50}
														/>
														<span className="level-num align-middle">
															Level {5}
														</span>
													</div>
												</Col>
												<Col>
													<Row>
														<Col>
															<div className="float-start">
																<p className="profile-at-label">Wins:</p>
															</div>
														</Col>
														<Col>
															<div className="float-end">
																<p className="profile-at-value">4</p>
															</div>
														</Col>
													</Row>
													<Row>
														<Col>
															<div className="float-start">
																<p className="profile-at-label">Losses:</p>
															</div>
														</Col>
														<Col>
															<div className="float-end">
																<p className="profile-at-value">0</p>
															</div>
														</Col>
													</Row>
												</Col>
											</Row>
											<Row className="profile-at-partners-rank-row">
												<Col>
													<div className="float-start">
														<p className="profile-at-label">Partner(s):</p>
														<p className="profile-at-value profile-partners float-start">
															Alina
														</p>
													</div>
												</Col>
												<Col>
													<div className="profile-at-rank-container">
														<p className="profile-at-label">Rank:</p>
														<p>Unranked</p>
													</div>
												</Col>
											</Row>
										</Col>
									</Row>
									<Row className="profile-at-main-row">
										<Col>
											<Row>
												<Col>
													<div className="level-container">
														<ProgressBar
															className="profile-progress-bar"
															now={25}
														/>
														<span className="level-num align-middle">
															Level {6}
														</span>
													</div>
												</Col>
												<Col>
													<Row>
														<Col>
															<div className="float-start">
																<p className="profile-at-label">Wins:</p>
															</div>
														</Col>
														<Col>
															<div className="float-end">
																<p className="profile-at-value">5</p>
															</div>
														</Col>
													</Row>
													<Row>
														<Col>
															<div className="float-start">
																<p className="profile-at-label">Losses:</p>
															</div>
														</Col>
														<Col>
															<div className="float-end">
																<p className="profile-at-value">0</p>
															</div>
														</Col>
													</Row>
												</Col>
											</Row>
											<Row className="profile-at-partners-rank-row">
												<Col>
													<div className="float-start">
														<p className="profile-at-label">Partner(s):</p>
														<p className="profile-at-value profile-partners float-start">
															Focus
														</p>
													</div>
												</Col>
												<Col>
													<div className="profile-at-rank-container">
														<p className="profile-at-label">Rank:</p>
														<p>Unranked</p>
													</div>
												</Col>
											</Row>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</>
		);
	}

	return <h1>Player not found.</h1>;
};

export default Profile;
