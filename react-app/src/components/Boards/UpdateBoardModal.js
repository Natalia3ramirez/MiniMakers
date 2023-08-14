import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { updateBoardThunk, getSingleBoardThunk } from '../../store/board'
import './Boards.css'
import { useModal } from '../../context/Modal'



const UpdateBoardModal = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user)
  const board = useSelector(state => state.pinnedBoards.singlePinnedBoard)
  const [name, setName] = useState(board.name);
  const [description, setDescription] = useState(board.description);
  const [frontendErrors, setFrontendErrors] = useState({});
  const [errors, setErrors] = useState([]);


  useEffect(() => {
    const frontendErrors = {}
    if (!name) {
      frontendErrors.name = "Name is required to create a Pin"
    }

    setFrontendErrors(frontendErrors)
  }, [name])

  const handleSubmit = async (e) => {
    e.preventDefault();

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


  };


  return (
    <div>
     <h1>Edit your board</h1>
      <form onSubmit={handleSubmit}
			encType="multipart/form-data">
				{/* <ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}

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
				{frontendErrors.name && <p className='on-submit-errors'>{frontendErrors.name}</p>}
        <label>
					Description
					<textarea
						type="text"
            placeholder='Tell everyone what your Board is about 😃'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>


				<button type="submit" onClick={handleSubmit} className="save-pin-button" >Done</button>

			</form>

    </div>



  )

}


export default UpdateBoardModal;
