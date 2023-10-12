import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Clan from './pages/Clan';
import Container from 'react-bootstrap/Container';

function App() {
	return (
		<>
			<Router>
				<Header />
				<Container>
					<Routes>
						<Route path="/" element={<Leaderboard />} />
						<Route path="/players/:playerId" element={<Profile />} />
						<Route path="/clans/:clanId" element={<Clan />} />
					</Routes>
				</Container>
			</Router>
		</>
	);
}

export default App;
