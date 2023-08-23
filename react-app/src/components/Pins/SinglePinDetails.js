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
import CreateComment from '../Comments/CreateComment';


export default function SinglePin() {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const pin = useSelector((state) => state.pins.singlePin)
  const user = useSelector((state) => state.session.user)
  const comments = pin.comments || []
  // console.log("this is the pin---->", pin)

  useEffect(() => {
    dispatch(getSinglePinThunk(pinId))
  }, [dispatch, pinId])

  if (!pin.id) return null



  // const closeMenu = () => setShowMenu(false);
  const pinUser = user.id === pin.user_id

  return (
    <div className='pin-details-container'>

      <div className="single-pin-container">
        <div className='detail-pin-image-container'>
          <img className="single-pin-image" src={pin.images} alt={pin.name} />
        </div>
        <div className='pin-title-description-container'>
          <div className='details-save-pin'>
            <OpenModalButton
              buttonText="Save to a Board"
              modalComponent={<AddPinToBoard pin={pin} />}
            />
          </div>
          <div className='pin-title-description'>
            <h2>{pin.title}</h2>
            <p>{pin.description}</p>
          </div>

          <div>
            <div >
              <div>
                <div className='profile-user-image'>
                  <img src={pin.user.image} alt={pin.user.firstName} />
                  <p>@{pin.user.firstName}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='pin-comments-container'>
            {comments.length ? (
              <h3 className="comment-title">{pin.commentsLen} Comments</h3>
            ):(
              <h3 className="comment-title">What do you think?</h3>
            )
          }
            <div className='submit-comment'>
              <CreateComment pin_id={pin.id} />
            </div>
            <div className='display-comments-container'>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <p>{comment.created_at}</p>
                  {/* <h3>{review.comment}</h3>
                  <p>{review.rating.toFixed(1)}</p>
                  <p>
                    {review.user.firstName} {review.user.lastName}
                  </p> */}
                </div>
              ))}
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
    </div>
  )

}
