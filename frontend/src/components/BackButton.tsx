import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton: React.FC = () => {
	return (
		<Link to={'/'}>
			<Button className="back-btn" variant="primary">
				<strong>
					<FontAwesomeIcon icon={faArrowLeft} /> Leaderboard
				</strong>
			</Button>
		</Link>
	);
};

export default BackButton;
