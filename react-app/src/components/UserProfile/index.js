import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBoardsThunk } from "../../store/board";
import { useHistory } from "react-router-dom";
import PinBoardCard from "./PinBoardCard";
import PinCard from "../LandingPage/PinCard";
import { getAllPins, getAllPinsThunk } from "../../store/pin";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"


const UserProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector(state => state.session.user);
  const pins = useSelector(state => state.pins.allPins);
  const pinsArr = pins ? Object.values(pins) : [];
  const boards = useSelector(state => state.pinnedBoards.allPinnedBoards)
  const boardsArr = boards ? Object.values(boards) : [];

  const filteredBoards = boardsArr.filter(board => board.user_id === user.id)
  const filteredPins = pinsArr.filter(pin => pin.user_id === user.id)

  const [selectDisplay, setSelectDisplay] = useState("pins")



  const handleSelectDisplay = (display) => {
    setSelectDisplay(display)
  }


  useEffect(() => {
    dispatch(getAllBoardsThunk())
    dispatch(getAllPinsThunk())
  }, [dispatch])

  const buttons = document.querySelectorAll('.boards-pins-buttons button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });



  return (
    <div>
      <div className='profile-user-image-container'>
        <div className='profile-user-image'>
          <img style={{ width: '110px', height: '110px' }} src={user.image} alt={user.name} />
        </div>
        <div className="boards-pins-buttons">
          <h1>{user.first_name}</h1>
          <span>@{user.first_name}</span>
          <p>{user.about_me}</p>
          <button onClick={() => handleSelectDisplay('pins')} class="active">Pins</button>
          <button onClick={() => handleSelectDisplay('boards')}>Boards</button>
        </div>
      </div>

      <div className='profile-pins'>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 1026: 5 }}
        >
          <Masonry>
            {selectDisplay === "pins" && (filteredPins.map((pin) => (
              <PinCard key={pin.id} pin={pin} />)
            ))}

          </Masonry>
        </ResponsiveMasonry>
        <div className='pin-board-card-container'>
          {selectDisplay === "boards" && (filteredBoards.map((board) => (

            <PinBoardCard key={board.id} board={board} />)
          ))}
        </div>


      </div>




    </div>
  )
}

export default UserProfilePage


