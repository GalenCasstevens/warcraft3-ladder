import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
	return (
		<Navbar className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="#home">
					<div className="align-middle">
						<img src="../img/frozen-throne-logo.webp" className="logo" />{' '}
						<span id="page-title">Ladder</span>
					</div>
				</Navbar.Brand>
			</Container>
		</Navbar>
	);
}

export default Header;
