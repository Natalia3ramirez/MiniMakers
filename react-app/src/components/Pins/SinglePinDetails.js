import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePinThunk } from '../../store/pin';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import DeletePinModal from './DeletePinModal';
import OpenModalButton from '../OpenModalButton';
import './Pins.css'
import UpdatePinModal from './UpdatePinModal';
import UserCard from '../UserProfile/UserCard';
import { useHistory } from 'react-router';
import AddPinToBoard from '../Boards/AddPinToBoardModal';


export default function SinglePin() {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const pin = useSelector((state) => state.pins.singlePin)
  const user = useSelector((state) => state.session.user)
  // console.log("this is the pin---->", pin)

  useEffect(() => {
    dispatch(getSinglePinThunk(pinId))
  }, [dispatch, pinId])

  if (!pin.id) return null

  const onClick = () => {
    history.push('/profile')
  }

  // const closeMenu = () => setShowMenu(false);
  const pinUser =  user.id === pin.user_id

  return (
    <div className="single-pin-container">
      <div>
        <img className="single-pin-image"  src={pin.images} alt={pin.name} />
      </div>
      <div className='pin-title-description-container'>
        <div className='details-save-pin'>
          <OpenModalButton
            buttonText="Save to a Board"
            // onItemClick={closeMenu}
            modalComponent={<AddPinToBoard pin_id={pin.id} />}
          />
        </div>
        <div className='pin-title-description'>
          <h2>{pin.title}</h2>
          <p>{pin.description}</p>
        </div>

        <div>
          <div onClick={onClick}>
            <div>
              <div className='profile-user-image'>
                <img  src={user.image} alt={user.name} />
                <p>@{pin.user.firstName}</p>
              </div>
            </div>
          </div>
        </div>
        {user && pinUser && (

        <div className='delete-edit-pin'>
          <OpenModalButton
            buttonText="Delete"
            // onItemClick={closeMenu}
            modalComponent={<DeletePinModal pinId={pin.id} />}
          />
          <OpenModalButton
            buttonText="Edit"
            // onItemClick={closeMenu}
            modalComponent={<UpdatePinModal pin={pin} />}
          />
        </div>
        )}

      </div>

    </div>
  )

}
