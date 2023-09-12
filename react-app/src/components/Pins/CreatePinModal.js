import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { createNewPinThunk, getAllPinsThunk } from '../../store/pin'
import './Pins.css'
import { useModal } from '../../context/Modal'


const CreatePinModal = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user)
    const pins = Object.values(useSelector(state => state.pins.allPins))
    const newPin = pins[pins.length - 1]
    console.log("the new pin", newPin)

    const [title, setTitle] = useState('');
    const [images, setImages] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [altText, setAltText] = useState('');
    const [website, setWebsite] = useState('');
    const [frontendErrors, setFrontendErrors] = useState({});
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)



    useEffect(() => {
        const frontendErrors = {}
        if (title.length < 3) {
            frontendErrors.title = "Title is must be at least 3 characters to create a Pin"
        }
        if (title.length > 50) {
            frontendErrors.title = "Title is must be 50 characters or less to create a Pin"
        }
        if (!title) {
            frontendErrors.title = "Title is required to create a Pin"
        }

        if (!images) {
            frontendErrors.images = "An image is required to create a Pin."
        }

        if (!newPin) return null

        setFrontendErrors(frontendErrors)
    }, [title, images])



    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)

        const hasFrontendErrors = Object.keys(frontendErrors).length > 0;
        if (!hasFrontendErrors) {

            const formData = new FormData();
            formData.append("title", title);
            formData.append("images", images);
            formData.append("description", description);
            formData.append("alt_text", altText);
            formData.append("website", website);
            formData.append('user_id', user.id)

            setImageLoading(true);

            if (!images) return null

            const data = await dispatch(createNewPinThunk(formData));
            await dispatch(getAllPinsThunk())



            if (data) {
                setErrors(data);
            } else {
                await history.push('/profile')
                await closeModal();
            }
        }

    };


    return (
        <div className="create-board-modal">
            <h1 className="modal-title">New Pin</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx} className="modal-error">
                            {error}
                        </li>
                    ))}
                </ul>
                <label className="modal-label">
                    Image
                    <input
                        className="modal-input"
                        type="file"
                        accept="image/*, image/jpeg, image/jpg, image/gif"
                        onChange={(e) => setImages(e.target.files[0])}
                    />
                </label>
                {frontendErrors.images && submitted && <p className="modal-error">{frontendErrors.images}</p>}
                <label className="modal-label">
                    Title
                    <input
                        className="modal-input"
                        type="text"
                        placeholder="Add your title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                {frontendErrors.title && submitted && <p className="modal-error">{frontendErrors.title}</p>}
                <div className="modal-user">
                    <img
                        src={user.image}
                        style={{ width: '50px', height: '50px' }}
                        alt={user.firstName}
                    />
                    {user.first_name}
                </div>
                <label className="modal-label">
                    Description
                    <textarea
                        className="modal-textarea"
                        type="text"
                        placeholder="Tell everyone what your pin is about 😃"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label className="modal-label">
                    Add alt Text
                    <input
                        className="modal-input"
                        type="text"
                        placeholder="Explain what people can see in the Pin"
                        value={altText}
                        onChange={(e) => setAltText(e.target.value)}
                    />
                </label>
                <label className="modal-label">
                    Website
                    <input
                        className="modal-input"
                        type="link"
                        placeholder="Add a destination link"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </label>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="modal-button save-pin-button"
                >
                    Save
                </button>
                {imageLoading && <p>Loading...</p>}
            </form>
        </div>


    )

}


export default CreatePinModal;
