import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBoardThunk } from '../../store/board';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';
import PinCard from '../LandingPage/PinCard';
import './Boards.css'
import { useHistory } from 'react-router';
import { getAllPinsThunk } from '../../store/pin';
import UpdateBoardModal from './UpdateBoardModal';
import DeleteBoardModal from './DeleteBoardModal';
import DeletePinFromBoard from './DeletePinFromBoardModal';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"


const SingleBoard = () => {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { closeModal } = useModal();
  const board = useSelector((state) => state.pinnedBoards.singlePinnedBoard)
  const user = useSelector((state) => state.session.user)
  const allPins = useSelector((state) => state.pins.allPins)
  const pinsArr = Object.values(allPins)

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
    history.push('/home')
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);


  const boardUser = user.id === board.user_id

  return (

    <div className="board-details-container">
      <div className='board-details-name'>
        <h1>{board.name}</h1>
      </div>
      <div className='profile-user-image'>
        <img style={{ width: '90px', height: '90px' }} src={user.image} alt={user.name} />
      </div>
      <div className='board-description'>{board.description}</div>
      {user && boardUser && (
        <>
        <div className="edit-add-board-container">
          <div className='edit-add-board'>

            <OpenModalButton
              className='edit-delete-board-details'
              buttonText="Edit board"
              onItemClick={closeMenu}
              modalComponent={<UpdateBoardModal />}><span class="material-symbols-outlined edit-icon">edit</span></OpenModalButton>
          </div>
          <button onClick={onClick} className='push-pin'> Add pins</button>
        </div>
        {board.pinLen === 1 ? (
          <div className='board-pin-length'>
          {board.pinLen} Pin
        </div>
        )
      :
      (
          <div className='board-pin-length'>
            {board.pinLen} Pins
          </div>
      )}
        </>

      )}

      <div className='pins-in-board-container'>
        {pins.length ? (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 1020: 5 }}
          >
            <Masonry>
              {pins.map((pin) => (
                <div className='boards-pins'>
                  <PinCard key={pin.id} pin={pin} />
                  {user && boardUser && (
                    <OpenModalButton
                      buttonText="Delete"
                      onItemClick={closeMenu}
                      modalComponent={<DeletePinFromBoard boardId={boardId} pinId={pin.id} />}
                    />

                  )}
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>

        )
          :
          ('')
        }
      </div>
    </div>
  )

}


export default SingleBoard;
