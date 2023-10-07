import Header from './components/Header';
import Leaderboard from './pages/Leaderboard';
import Container from 'react-bootstrap/Container';

function App() {
	return (
		<>
			<Header />
			<Container>
				<Leaderboard />
			</Container>
		</>
	);
}

export default App;
