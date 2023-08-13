import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreatePinModal from "../Pins/CreatePinModal"
import CreateBoardModal from '../Boards/CreateBoardModal'

function CreateButton({ user }) {
  const dispatch = useDispatch();
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

  // const handleCreate = (e) => {
  //   e.preventDefault();
  //   dispatch(logout());
  // };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        Create
      </button>
      <ul className={ulClassName} ref={ulRef}>

          <>
            <OpenModalButton
              buttonText="Create Pin"
              onItemClick={closeMenu}
              modalComponent={<CreatePinModal />}
            />

            <OpenModalButton
              buttonText="Create Board"
              onItemClick={closeMenu}
              modalComponent={<CreateBoardModal />}
            />
          </>

      </ul>
    </>
  );
}

export default CreateButton;