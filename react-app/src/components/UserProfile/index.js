import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBoardsThunk } from "../../store/board";
import { useHistory } from "react-router-dom";
import PinBoardCard from "./PinBoardCard";
import PinCard from "../LandingPage/PinCard";
import { getAllPins, getAllPinsThunk } from "../../store/pin";


const UserProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector(state => state.session.user);

  const pins = useSelector(state => state.pins.allPins);
  const pinsArr = pins ? Object.values(pins) : [];
  const boards =  useSelector(state => state.pinnedBoards.allPinnedBoards)
  const boardsArr = boards ? Object.values(boards) : [];
  console.log(" the pins ---->", pins)

  const filteredBoards = boardsArr.filter(board => board.user_id === user.id)
  const filteredPins = pinsArr.filter(pin => pin.user_id === user.id)
  console.log(" the boards ---->", filteredBoards)

  // const imagesArray = []


  // const imagesArray = filteredBoards.map((board => board.pin))


  useEffect(() => {
    dispatch(getAllBoardsThunk())
    dispatch(getAllPinsThunk())
  }, [dispatch])


  return (
    <>
      <div className='profile-user-image'>
      <img style={{ width: '75px', height: '75px' }} src={user.image} alt={user.name} />
      </div>
      <div>
        <h2>{user.first_name}</h2>
        <p>@{user.first_name}</p>
        <p>{user.about_me}</p>
      </div>
      <div className='profile-pins'>
        <h2>List of Pins</h2>
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

          {/* <div>
          <PinBoardCard  />
          </div> */}
      </div>




    </>
  )
}

export default UserProfilePage


// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllPinnedBoardsThunk } from "../../store/board";
// // import './LandingPage.css';
// import { useHistory } from "react-router-dom";
// // import PinCard from "./PinCard";


// const UserProfilePage = () => {
//   const dispatch = useDispatch();
//   const history = useHistory()
//   const pins = Object.values(useSelector(state => state.pins.allPins));

//   useEffect(() => {
//     dispatch(getAllPinnedBoardsThunk())
//   }, [dispatch])

//   if(!pins.length) return null

//   return (
//     <>
//       <h1>User Profile</h1>
//       {/* < div >
//         <h2>List of Pins</h2>

//           {pins.map((pin) => (


//               <PinCard key={pin.id} pin={pin}/>

//           ))}

//       </div > */}


//     </>
//   )
// }

// export default UserProfilePage
