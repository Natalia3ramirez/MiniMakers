import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateButton from './CreateButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className="navigation">
			<div className="home-create-container">
				<div>
					<NavLink exact to="/home">Home</NavLink>
				</div>
				<div>
					{sessionUser && (
						<CreateButton user={sessionUser} />

					)}
				</div>

			</div>

			{isLoaded && (
				<div className="user-menu">
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
