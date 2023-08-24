import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { createNewCommentThunk } from '../../store/comment'
import { getSinglePinThunk } from '../../store/pin'
import './Comments.css'


const CreateComment = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user)
  const pin = useSelector(state => state.pins.singlePin)

  const [message, setMessage] = useState('');
  const [frontendErrors, setFrontendErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    const frontendErrors = {}
    if (message.length < 3) {
      frontendErrors.message = "Message is must be at least 3 characters to create a Pin"
    }
    if (message.length > 500) {
      frontendErrors.message = "Message is must be 500 characters or less to create a Pin"
    }
    setFrontendErrors(frontendErrors)
  }, [message])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)

    const hasFrontendErrors = Object.keys(frontendErrors).length > 0;
    if (hasFrontendErrors) {
     return
    }
      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("pin_id", pin.id);
      formData.append("message", message);


      const data = await dispatch(createNewCommentThunk(formData, pin.id));
      await dispatch(getSinglePinThunk(pin.id))
      setMessage("")

      if (data) {
        setErrors(data);
      }
  };

  return (
    <div className="pin-comment-container">
      <form encType="multipart/form-data">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="modal-error">
              {error}
            </li>
          ))}
        </ul>

        <label className="comment-label">
          <div className='comment-button-container'>
            <img className="pin-owner-icon" style={{ width: '30px', height: '30px' }} src={pin.user.image} alt={pin.user.firstName} />
            <div className='comment-and-button'>
              <input
                className="comment-textarea"
                type="text"
                placeholder="Add a comment"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                onClick={handleSubmit}
                className="modal-button submit-comment"
              >
                😃
              </button>
            </div>
          </div>

        </label>

      </form>
    </div>


  )

}


export default CreateComment
