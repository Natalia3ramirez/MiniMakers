import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePinThunk } from '../../store/pin';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import DeletePinModal from './DeletePinModal';
import OpenModalButton from '../OpenModalButton';
import './Pins.css'


export default function SinglePin() {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const pin = useSelector((state) => state.pins.singlePin)
  const user = pin.user
  // console.log("this is the pin---->", user)

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = (e) => {
  //     if (!ulRef.current.contains(e.target)) {
  //       setShowMenu(false);
  //     }
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  useEffect(() => {
    dispatch(getSinglePinThunk(pinId))
  }, [dispatch, pinId])

  if (!pin.id) return null

  // const closeMenu = () => setShowMenu(false);

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
        <div>
        <OpenModalButton
              buttonText="Delete"
              // onItemClick={closeMenu}
              modalComponent={<DeletePinModal pinId={pin.id} />}
            />
        </div>
      </div>

    </div>
  )

}
