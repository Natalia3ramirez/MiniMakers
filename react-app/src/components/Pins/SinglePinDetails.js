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
import DeleteEditComment from '../Comments/DeleteEditComment';
import DeleteEditPin from './DeleteEditPin';


export default function SinglePin() {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const pin = useSelector((state) => state.pins.singlePin)
  const user = useSelector((state) => state.session.user)
  const commentsArr = pin.comments || [];
  const comments = commentsArr.reverse()

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
            <div id='delete-edit-pin-modal'>
              {user && pinUser && (
              <OpenModalButton
                buttonText="···"
                modalComponent={<DeleteEditPin pin={pin} pinId={pin.id} />}
              />
              )}
            </div>
            <div className='save-to-board'>
              <OpenModalButton
                buttonText="Save to a Board"
                modalComponent={<AddPinToBoard pin={pin} />}
              />

            </div>
            <div>
            </div>
          </div>
          <div className='scroll-bar-pin'>
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
            ) : (
              <div className='comments'>
                <div>
                  <h4>Comments</h4>
                  <p>No comments yet! Add one to start the conversation.</p>
                </div>

                <h3 className="comment-title">What do you think?</h3>
              </div>
            )
            }

            <div className='display-comments-container'>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <div className='user-comment-container'>
                  <img className="pin-owner-icon" style={{ width: '25px', height: '25px' }} src={comment.user.image} alt={comment.user.firstName} />
                  <h3>{comment.user.firstName}</h3>
                  <p>{comment.message}</p>
                  </div>
                  <p>{new Date(comment.created_at).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                  {user.id === comment.user_id ? (
                    <div className='delete-edit-comment-modal'>
                      <OpenModalButton
                        buttonText="···"
                        modalComponent={<DeleteEditComment commentId={comment.id} pinId={pin.id} comment={comment} />}
                      />
                    </div>
                  ) : ('')}
                </div>
              ))}
            </div>
          </div>

          </div>
            <div className='submit-comment'>
              <CreateComment pin={pin} />
            </div>
        </div>

      </div>
    </div>
  )

}
