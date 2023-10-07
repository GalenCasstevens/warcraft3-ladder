import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';

function Leaderboard() {
	const XP_FACTOR = 0.32;

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

	const calculateLevel = (xp) => {
		const XP_FACTOR = 0.32;
		return Math.floor(XP_FACTOR * Math.sqrt(xp));
	};

	const calculateXpNeeded = (xp) => {};

	return (
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
				<tr>
					<td>{ordinalSuffixOf(1)}</td>
					<td className="align-middle">
						<div className="level-container">
							<ProgressBar now={50} />
							<span className="level-num">{calculateLevel(30123)}</span>
						</div>
					</td>
					<td className="clan-col">RiZE</td>
					<td className="icon-img-cell align-middle">
						<img
							className="icon-img"
							src={require(`../assets/infernal-icon.webp`)}
						/>
					</td>
					<td className="player-name-col" colSpan={2}>
						Galen
					</td>
					<td>30,123</td>
					<td>356</td>
					<td>234</td>
				</tr>
				<tr>
					<td>{ordinalSuffixOf(2)}</td>
					<td className="align-middle">
						<div className="level-container">
							<ProgressBar now={25} />
							<span className="level-num">22</span>
						</div>
					</td>
					<td className="clan-col">s4s</td>
					<td className="icon-img-cell align-middle">
						<img
							className="icon-img"
							src={require(`../assets/pit-lord-icon.webp`)}
						/>
					</td>
					<td className="player-name-col" colSpan={2}>
						NOSKILLREQUIRED
					</td>
					<td>13,144</td>
					<td>134</td>
					<td>85</td>
				</tr>
				<tr>
					<td>{ordinalSuffixOf(3)}</td>
					<td className="align-middle">
						<div className="level-container">
							<ProgressBar now={75} />
							<span className="level-num">15</span>
						</div>
					</td>
					<td className="clan-col">LuX</td>
					<td className="icon-img-cell align-middle">
						<img
							className="icon-img"
							src={require(`../assets/naga-myrmidon-icon.webp`)}
						/>
					</td>
					<td className="player-name-col" colSpan={2}>
						0_0.
					</td>
					<td>9,234</td>
					<td>48</td>
					<td>4</td>
				</tr>
			</tbody>
		</Table>
	);
}

export default Leaderboard;
