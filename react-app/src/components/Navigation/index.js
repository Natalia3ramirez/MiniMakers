import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateButton from './CreateButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	console.log("nav session user", sessionUser)


	return (
		<>

		{ isLoaded && (
			<>
				<div className="navigation">
					{sessionUser ? (
						<>
						<div className="home-create-container">
							<div className="home-create-container">
								<div className="navlink-home">
									<NavLink exact to="/home" className="home-button">Home</NavLink>
								</div>
							</div>
							<div className="navlink-create">
								<div className='create-button-container'>
									<CreateButton user={sessionUser}></CreateButton>
								</div>
							</div>

						</div>
							<div className="user-menu">
								<ProfileButton user={sessionUser} />
							</div>
						</>
					)
						:
						(
							<div className='login-signup-container'>
								<div className='user-icon-login'>
									<OpenModalButton
										buttonText="Log In"
										// onItemClick={closeMenu}
										modalComponent={<LoginFormModal />}
									/>
								</div>
								<div className='user-icon-signup'>
									<OpenModalButton
										buttonText="Sign Up"
										// onItemClick={closeMenu}
										modalComponent={<SignupFormModal />}
									/>
								</div>
							</div>
						)
					}

				</div>
			</>
		)
		}
		</>
	);
}

export default Navigation;


