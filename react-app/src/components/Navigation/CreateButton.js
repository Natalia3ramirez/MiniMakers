import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import './Navigation.css';
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

  const ulClassName = "create-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        Create

      </button>
      <ul className={ulClassName} ref={ulRef}>

        <>
        <div className='nav-create-board'>

          <OpenModalButton
            buttonText="Create Board"
            onItemClick={closeMenu}
            modalComponent={<CreateBoardModal />}
          />
        </div>
        <div className='nav-create-pin'>

          <OpenModalButton
            buttonText="Create Pin"
            onItemClick={closeMenu}
            modalComponent={<CreatePinModal />}
          />
        </div>

        </>

      </ul>
    </>
  );
}

export default CreateButton;
