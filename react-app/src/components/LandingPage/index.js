import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPinsThunk } from "../../store/pin";
import './LandingPage.css';
import { useHistory } from "react-router-dom";
import PinCard from "./PinCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const LandingPage = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const pins = Object.values(useSelector(state => state.pins.allPins));

  useEffect(() => {
    dispatch(getAllPinsThunk())
  }, [dispatch])

  if(!pins.length) return null

  return (
    <div className='masonry-container'>
    <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 1020: 5 }}
      >
        <Masonry>
            {pins.map((pin) => (
              <PinCard key={pin.id} pin={pin} />
            ))}

        </Masonry>
      </ResponsiveMasonry>

    </div>
  )
}

export default LandingPage


