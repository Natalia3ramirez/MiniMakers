import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBoardThunk } from '../../store/board';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';
import PinCard from '../LandingPage/PinCard';
import './Boards.css'

import UserCard from '../UserProfile/UserCard';
import { useHistory } from 'react-router';
import { getAllPinsThunk } from '../../store/pin';
import UpdateBoardModal from './UpdateBoardModal';


const SingleBoard = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { closeModal } = useModal();
  const board = useSelector((state) => state.pinnedBoards.singlePinnedBoard)
  // console.log("the board---->", board)
  const allPins = useSelector((state) => state.pins.allPins)
  const pinsArr = Object.values(allPins)
  // console.log("the pins------->", pinsArr)

  const pins = board.boardImages ? pinsArr.filter(pin => board.boardImages.some(image => pin.images.includes(image))) : [];

  // pins = pins.filter(pin => )

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };


  useEffect(() => {
    dispatch(getSingleBoardThunk(boardId))
    dispatch(getAllPinsThunk())

  }, [dispatch, boardId])

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

  if (!board.id) return null

  const onClick = () => {
    history.push('/profile')
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  // const closeMenu = () => setShowMenu(false);

  return (
    <div className="single-pin-container">
      <h1>{board.name}</h1>
      <div>

      <OpenModalButton
              buttonText="Edit"
              onItemClick={closeMenu}
              modalComponent={<UpdateBoardModal />}
            />
      </div>

<div>
  {pins.length ? (
    <div>

      {pins.map((pin) => (
        <PinCard key={pin.id} pin={pin} />
      ))}
    </div>

  )
  :
  (
    <div>

      <h1> New Board</h1>
      <p>There aren’t any Pins on this board yet</p>
    </div>

  )
  }


</div>




    </div>
  )

}


export default SingleBoard;
