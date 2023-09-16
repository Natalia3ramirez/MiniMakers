import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from 'react-router';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreateButton from "./CreateButton";
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    history.push('/')
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const onClick = (e) => {
    history.push('/profile')
  };


  return (
    <>
      {user && (


        <div className="user-icon" >
          <div className='about-me'>

          <a href="https://www.linkedin.com/in/natalia-ramirez-750817151" target="_blank" ><i class="fa-brands fa-linkedin" style={{ color: "#4f5051", }}></i></a>
          <a href="https://github.com/Natalia3ramirez" target="_blank"><i class="fab fa-github" style={{ color: "#4f5051", }}></i></a>
          <a href="https://Natalia3ramirez.github.io/" target="_blank"><i class="fa-solid fa-book"  style={{ color: "#4f5051", }}></i></a>
          </div>
          <img onClick={onClick} src={user.image} alt={user.name} />
          <button className="user-icon-container" onClick={openMenu}>
            <span className="material-symbols-outlined">expand_more</span>
          </button>
          <div className={ulClassName} ref={ulRef}>

            <div className='user-dropdown-container'>
              <div className='currently-in'>Currently in</div>
              <div className='user-menu-dropdown-container' onClick={onClick}>
                <img className="dropdown-user-icon" style={{ width: '55px', height: '55px' }} src={user.image} alt={user.first_name} />
                <span>{user.first_name}</span>
              </div>
              <p className='logout-button-container'>
                <button className="logout-button" onClick={handleLogout}>Log Out</button>
              </p>
            </div>

          </div>
        </div>

      )}

    </>
  );
}

export default ProfileButton;



