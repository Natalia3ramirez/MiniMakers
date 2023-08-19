import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { updateBoardThunk, getSingleBoardThunk } from '../../store/board'
import './Boards.css'
import { useModal } from '../../context/Modal'
import OpenModalButton from '../OpenModalButton';
import DeleteBoardModal from './DeleteBoardModal';



const UpdateBoardModal = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user)
  const board = useSelector(state => state.pinnedBoards.singlePinnedBoard)
  const [name, setName] = useState(board.name);
  const [showMenu, setShowMenu] = useState(false);
  const [description, setDescription] = useState(board.description);
  const [frontendErrors, setFrontendErrors] = useState({});
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);



  useEffect(() => {
    const frontendErrors = {};

    if (!name) {
      frontendErrors.name = "Name is required to update a board";
    }
    if (name.length < 3) {
      frontendErrors.name = "Name must be at least 3 characters to update a board";
    }
    if (name.length > 50) {
      frontendErrors.name = "Name must be 50 characters or less to update a board";
    }
    if(description && description.length > 500){
      frontendErrors.description = "Description must be 500 characters or less"
    }

    setFrontendErrors(frontendErrors);
  }, [name, description]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true)


    const hasFrontendErrors = Object.keys(frontendErrors).length > 0;
    if (!hasFrontendErrors) {



      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)



      try {
        const data = await dispatch(updateBoardThunk(formData, board.id));
        if (data) {
          setErrors(data);

        }
      } catch (error) {
        console.error("An error occurred:", error.message);
      }

      await dispatch(getSingleBoardThunk(board.id))
      await closeModal()
    }

  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="edit-board-container">
      <h1>Edit your board</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Name
          <input
            type="text"
            placeholder='Like "Activities for Kids"  or "Recipes for Kids"'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {frontendErrors.name && submitted && <p className='on-submit-errors'>{frontendErrors.name}</p>}
        <label>
          Description
          <textarea
            type="text"
            placeholder="What's your board about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='description-box'
          />
        </label>
        {frontendErrors.description && submitted && <p className='on-submit-errors'>{frontendErrors.description}</p>}
        <OpenModalButton
            buttonText="Delete"
            onItemClick={closeMenu}
            modalComponent={< DeleteBoardModal boardId={board.id} />}
          />

        <button type="submit" onClick={handleSubmit} className="save-pin-button">Done</button>
      </form>
    </div>


  )

}


export default UpdateBoardModal;
