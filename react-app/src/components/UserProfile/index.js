import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPinnedBoardsThunk } from "../../store/board";
import { useHistory } from "react-router-dom";
import PinBoardCard from "./PinBoardCard";


const UserProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const pins = useSelector(state => console.log("this is the state", state));

  useEffect(() => {
    dispatch(getAllPinnedBoardsThunk())
  }, [dispatch])

  // if(!pins.length) return null

  return (
    <>
      <h1>Landing Page</h1>
      {/* < div >
        <h2>List of Pins</h2>

          {pins.map((pin) => (


              <PinCard key={pin.id} pin={pin}/>

          ))}

      </div > */}


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
