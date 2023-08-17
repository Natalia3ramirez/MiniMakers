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
				<div className="navlink-home">
					<NavLink exact to="/home" className="home-button">Home</NavLink>
				</div>
					{sessionUser && (
				<div className="navlink-create">
						<div>
							<CreateButton user={sessionUser}></CreateButton>
						</div>
				</div>
					)}
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
