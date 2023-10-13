import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Header: React.FC = () => {
	return (
		<Navbar className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="#home">
					<Link id="logo-link" to={'/'}>
						<div className="align-middle">
							<img src="../img/frozen-throne-logo.webp" className="logo" />{' '}
							<span id="page-title">Ladder</span>
						</div>
					</Link>
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
};

export default Header;
