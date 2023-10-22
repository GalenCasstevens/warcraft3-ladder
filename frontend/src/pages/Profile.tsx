import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BackButton from '../components/BackButton';

const Profile: React.FC = () => {
	return (
		<>
			<BackButton />
			<div className="profile-container">
				<Row>
					<Col md={2}>
						<img
							className="profile-img"
							src={require(`../assets/profile-img/doom-guard-profile.gif`)}
						/>
					</Col>
					<Col className="profile-name-col" md={2}>
						<Row>
							<p className="profile-name-label">Player Name:</p>
							<p className="profile-name">Solar</p>
						</Row>
						<Row>
							<p className="profile-clan-label">Clan Name:</p>
							<p className="profile-clan">RiZE</p>
						</Row>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default Profile;
