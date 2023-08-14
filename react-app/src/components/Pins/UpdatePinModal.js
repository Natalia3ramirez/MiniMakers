import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { updatePinThunk, getSinglePinThunk } from '../../store/pin'
import './Pins.css'
import { useModal } from '../../context/Modal'



const UpdatePinModal = ({ pin }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user)

  const [title, setTitle] = useState(pin.title);
  // const [images, setImages] = useState(null);
  // const [imageLoading, setImageLoading] = useState(false);
  const [description, setDescription] = useState(pin.description);
  const [alt_text, set_alt_text] = useState(pin.altText);
  const [website, setWebsite] = useState(pin.website);
  // const [images, setImages] = useState(null);
  const [frontendErrors, setFrontendErrors] = useState({});
  const [errors, setErrors] = useState([]);

  console.log("this is the user----->", user)

  useEffect(() => {
    const frontendErrors = {}
    if (!title) {
      frontendErrors.title = "Title is required to create a Pin"
    }

    setFrontendErrors(frontendErrors)
  }, [title])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("alt_text", alt_text)
    formData.append("website", website)
    // console.log("THis is the edit title ----->", title)


    // const editedPinData = {
    //   user_id: user.id,
    //   title,
    //   description,
    //   alt_text,
    //   website,
    //   // images: images,

    // };

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


  };


  return (
    <div>
      <h1>New Pin</h1>
      <form onSubmit={handleSubmit}
        encType="multipart/form-data">
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <img src={pin.images} style={{ width: '200px', height: '300px' }} alt={pin.title} />
        {/* <label>
					Image
					<input
              type="file"
              accept="image/*, image/jpeg, image/jpg, image/gif"
              onChange={(e) => setImages(e.target.files[0])}
            />
				</label> */}
        {frontendErrors.images && <p className='on-submit-errors'>{frontendErrors.images}</p>}
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



        <button type="submit" onClick={handleSubmit} className="save-pin-button" disabled={Object.keys(frontendErrors).length > 0}>Save</button>

      </form>

    </div>



  )

}


export default UpdatePinModal;
