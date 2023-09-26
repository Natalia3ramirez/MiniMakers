import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { updatePinThunk, getSinglePinThunk } from '../../store/pin';
import './Pins.css';
import { useModal } from '../../context/Modal';



const UpdatePinModal = ({ pin }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user);
  const [title, setTitle] = useState(pin.title);
  const [description, setDescription] = useState(pin.description);
  const [alt_text, set_alt_text] = useState(pin.alt_text);
  const [website, setWebsite] = useState(pin.website);
  const [frontendErrors, setFrontendErrors] = useState({});
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);



  useEffect(() => {
    const frontendErrors = {}
    if (!title) {
      frontendErrors.title = "Title is required to create a Pin"
    }
    if(description && description.length > 500){
      frontendErrors.description = "Description must be 500 characters or less"
    }

    setFrontendErrors(frontendErrors)
  }, [title, description])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true)

    const hasFrontendErrors = Object.keys(frontendErrors).length > 0;
    if (!hasFrontendErrors) {

      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("alt_text", alt_text)
      formData.append("website", website)

      try {
        const data = await dispatch(updatePinThunk(formData, pin.id));
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
    <div className="edit-pin-container">
      <h1>Edit this Pin</h1>
      <div className="form-content">

        <form onSubmit={handleSubmit}
          encType="multipart/form-data">

          {/* {frontendErrors.images && <p className='on-submit-errors'>{frontendErrors.images}</p>} */}
          <label>
            Title
            <input
              type="text"
              placeholder='Add your title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}

            />
          </label>
          {frontendErrors.title && <p className='on-submit-errors'>{frontendErrors.title}</p>}
          <div>
            {user.first_name}
            <img src={user.image} style={{ width: '50px', height: '50px' }} alt={user.firstName} />

          </div>

          <label>
            Description
            <textarea
              type="text"
              placeholder='Tell everyone what your pin is about 😃'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          {frontendErrors.description && <p className='on-submit-errors'>{frontendErrors.description}</p>}
          <label>
            Add alt Text
            <input
              type="text"
              placeholder='Explain what people can see in the Pin'
              value={alt_text}
              onChange={(e) => set_alt_text(e.target.value)}
            />
          </label>
          <label >
            Website
            <input
              type="link"
              placeholder='Add a destination link'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>

            <button type="submit" onClick={submitCancel} className="cancel-pin-button">Cancel</button>
            <button type="submit" onClick={handleSubmit} className="save-pin-button">Save</button>


        </form>
        <div className="form-image">
          <img src={pin.images} alt={pin.title} />
        </div>
      </div>

    </div>



  )

}


export default UpdatePinModal;
