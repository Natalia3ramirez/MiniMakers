import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBoardsThunk } from "../../store/board";
import { useHistory } from "react-router-dom";
import PinBoardCard from "./PinBoardCard";
import PinCard from "../LandingPage/PinCard";
import { getAllPins, getAllPinsThunk } from "../../store/pin";
import UserCard from "./UserCard";


const UserProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector(state => state.session.user);

  const pins = useSelector(state => state.pins.allPins);
  const pinsArr = pins ? Object.values(pins) : [];
  const boards =  useSelector(state => state.pinnedBoards.allPinnedBoards)
  const boardsArr = boards ? Object.values(boards) : [];

  const filteredBoards = boardsArr.filter(board => board.user_id === user.id)
  const filteredPins = pinsArr.filter(pin => pin.user_id === user.id)


  // const imagesArray = []


  // const imagesArray = filteredBoards.map((board => board.pin))


  useEffect(() => {
    dispatch(getAllBoardsThunk())
    dispatch(getAllPinsThunk())
  }, [dispatch])


  return (
    <>
      <div className='profile-user-image'>
    {/* <UserCard user={user}/> */}
      <img style={{ width: '75px', height: '75px' }} src={user.image} alt={user.name} />
      </div>
      <div>
        <h2>{user.first_name}</h2>
        <p>@{user.first_name}</p>
        <p>{user.about_me}</p>
      </div>
      <div className='profile-pins'>

        <div>
          {filteredPins.map((pin) => (

              <PinCard key={pin.id} pin={pin}/>
          ))}
        </div>
        <div>
          {filteredBoards.map((board) => (

              <PinBoardCard key={board.id} board={board}/>
          ))}
        </div>


      </div>




    </>
  )
}

export default UserProfilePage


