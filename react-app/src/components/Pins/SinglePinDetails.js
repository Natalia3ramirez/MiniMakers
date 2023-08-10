import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePinThunk } from '../../store/pin';
import { useParams } from 'react-router-dom';
import './Pins.css'


export default function SinglePin() {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pins.singlePin)
  const user = pin.user
  // console.log("this is the pin---->", user)

  useEffect(() => {
    dispatch(getSinglePinThunk(pinId))
  }, [dispatch, pinId])

  if (!pin.id) return null

  return (
    <div className="single-pin-container">
      <div>
        <img style={{ width: '250px', height: '300px' }} src={pin.images} alt={pin.name} />
      </div>
      <div>
        <div>
          <h2>{pin.title}</h2>
          <p>{pin.description}</p>
        </div>
        <div>
          <button >Save</button>
        </div>
        <div>
          <img src={user.image} style={{ width: '50px', height: '50px' }} alt={user.firstName} />
          <p>{user.firstName}</p>
        </div>
      </div>

    </div>
  )

}
