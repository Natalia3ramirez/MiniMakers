import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getSinglePinThunk } from '../../store/pin';
// import DeletePinModal from './DeletePinModal';
import OpenModalButton from '../OpenModalButton';
import './Comments.css';
import { useModal } from '../../context/Modal';
import { updateCommentThunk } from '../../store/comment';


const UpdateCommentModal = ({ comment }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user);
  const [message, setMessage] = useState(comment.message);
  const [frontendErrors, setFrontendErrors] = useState({});
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const pin = useSelector((state) => state.pins.singlePin)

  // console.log("this is the user----->", user)

  useEffect(() => {
    const frontendErrors = {}
    if (!message) {
      frontendErrors.message = "Comment field cannot be empty"
    }
    if (message && message.length > 500) {
      frontendErrors.message = "Comment must be 500 characters or less"
    }

    setFrontendErrors(frontendErrors)
  }, [message])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true)

    const hasFrontendErrors = Object.keys(frontendErrors).length > 0;
    if (!hasFrontendErrors) {

      const formData = new FormData()
      formData.append("message", message)


      try {
        const data = await dispatch(updateCommentThunk(formData, comment.id));
        if (data) {
          setErrors(data);

        }
      } catch (error) {
        console.error("An error occurred:", error.message);
      }

      await dispatch(getSinglePinThunk(pin.id))
      await closeModal()


    }
  }

  const submitCancel = () => {
    closeModal()
  };


  return (
    <div className="edit-comment-container">

      <div className="form-content">

        <form onSubmit={handleSubmit}
          encType="multipart/form-data">
          <div className='comment-and-button'>
            <input
              className="update-comment-textarea"
              type="text"

              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          {frontendErrors.message && <p className='on-submit-errors'>{frontendErrors.message}</p>}
          <div className='cancel-save-comment'>
          <button type="submit" onClick={submitCancel} className="cancel-pin-button">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="update-save-comment">Save</button>
          </div>

        </form>

      </div>

    </div>



  )

}


export default UpdateCommentModal;
