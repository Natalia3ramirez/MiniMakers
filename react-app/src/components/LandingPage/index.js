import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPinsThunk } from "../../store/pin";
import './LandingPage.css';
import { useHistory } from "react-router-dom";
import PinCard from "./PinCard";


const LandingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const pins = Object.values(useSelector(state => state.pins.allPins));

  useEffect(() => {
    dispatch(getAllPinsThunk())
  }, [dispatch])

  if(!pins.length) return null

  return (
    <>
      < div className="landing-page-container">

          {pins.map((pin) => (
              <PinCard key={pin.id} pin={pin}/>
          ))}
      </div >
    </>
  )
}

export default LandingPage


  // < div >
  //     <h2>List of Pins</h2>
  //     <ul>
  //       {pins.map((pin) => (
  //         <li key={pin.id}>
  //           <h3>{pin.title}</h3>
  //           <p>{pin.description}</p>
  //           {/* Render other pin details as needed */}
  //         </li>
  //       ))}
  //     </ul>
  //   </div >
