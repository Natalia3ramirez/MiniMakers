import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { addPinToBoardThunk, createNewBoardThunk, getAllBoardsThunk } from '../../store/board'
import './Boards.css'
import { useModal } from '../../context/Modal'
import PinBoardCard from '../UserProfile/PinBoardCard'


const AddPinToBoard = ({pin_id}) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user)
  const boards = useSelector(state => state.pinnedBoards.allPinnedBoards)
  const boardsArr = boards ? Object.values(boards) : [];
  console.log("the boards", boardsArr)

  const userBoards = boardsArr.length ? boardsArr.filter(board => board.user_id === user.id) : [];

    console.log("the user boards", userBoards)
  const[board_id, setBoardId] = useState('');
  // const [description, setDescription] = useState('');
  // const [frontendErrors, setFrontendErrors] = useState({});
  const [errors, setErrors] = useState([]);



  useEffect(() => {
    dispatch(getAllBoardsThunk())
	}, [dispatch])

  const handleButtonClick = (board) => {
    setBoardId(board.id);
  };

  const handleSubmit = async ( e) => {
		e.preventDefault();

		const formData = new FormData();
    formData.append("pin_id", pin_id)
		formData.append("board_id", board_id);


		await dispatch(addPinToBoardThunk(formData));
    await dispatch(getAllBoardsThunk())
    await history.push(`/boards/${board_id}`)
    await closeModal();

	

	};


  return (
    <div>
      <h1>Add to a board</h1>

      <div>

          {userBoards.map((board) => (
            // <PinBoardCard />
            <div key={board.id}>
              <img style={{ width: '75px', height: '75px' }} src={board?.boardImages[0]} />
              <button key={board.id} onClick={() => handleButtonClick(board)}  >{board.name}</button>
            </div>

          ))}
          <button onClick={handleSubmit}>Add Pin</button>
      </div >
      {/* <form onSubmit={handleSubmit}
			encType="multipart/form-data">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>

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


				<button type="submit" onClick={handleSubmit} className="save-pin-button" >Create </button>

			</form> */}

    </div>



  )

}


export default AddPinToBoard
