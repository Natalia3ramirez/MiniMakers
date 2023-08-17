import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { addPinToBoardThunk, createNewBoardThunk, getAllBoardsThunk } from '../../store/board'
import './Boards.css'
import { useModal } from '../../context/Modal'
import PinBoardCard from '../UserProfile/PinBoardCard'
import CreateBoardModal from './CreateBoardModal'
import OpenModalButton from '../OpenModalButton'


const AddPinToBoard = ({ pin_id }) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user)
  const boards = useSelector(state => state.pinnedBoards.allPinnedBoards)
  const boardsArr = boards ? Object.values(boards) : [];
  const pin = useSelector((state) => state.pins.singlePin)

  const userBoards = boardsArr.length ? boardsArr.filter(board => board.user_id === user.id) : [];

  const [board_id, setBoardId] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const ulRef = useRef();

  const [errors, setErrors] = useState([]);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };



  useEffect(() => {
    dispatch(getAllBoardsThunk())
  }, [dispatch])

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

  const handleButtonClick = (board) => {
    setSelectedBoardId(board.id);
    setBoardId(board.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("pin_id", pin_id)
    formData.append("board_id", board_id);


    await dispatch(addPinToBoardThunk(formData));
    await dispatch(getAllBoardsThunk())
    await history.push(`/boards/${board_id}`)
    await closeModal();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);


  return (
    <div className='pin-to-board-container'>
      {userBoards.length ? (

        <div className='pin-to-board-content'>
          <h1>Add to a board</h1>
          <div>
            {userBoards.map((board) => (
              <div
                key={board.id}
                className={`select-board-for-pin ${selectedBoardId === board.id ? 'selected' : ''}`}
                onClick={() => handleButtonClick(board)}
              >
                {board.boardImages[0] ? (
                  <img src={board.boardImages[0]} alt={board.name} />
                )
                  :
                  (
                    <img src={'https://garden.spoonflower.com/c/11034657/p/f/m/t2ST4w6akYxbx2bXxMt2LvMpYhUWRq7aC_sbhfOxQFqMvj7Xksa9yPA/Light%20grey.%20Light%20gray.%20Blank%20solid%20colout.jpg'} alt={board.name} />
                  )}
                <span>{board.name}</span>
              </div>
            ))}
            <div className='add-pin-button-container'>
              <button onClick={handleSubmit} className='add-pin-button'>Add Pin</button>
            </div>
          </div >
        </div>
      ) : (
        <div>
          <div>Create a Board First!</div>
          <div>
            <OpenModalButton
              buttonText="Create Board"
              onItemClick={closeMenu}
              modalComponent={<CreateBoardModal />}
            />
          </div>
        </div>
      )}
    </div>
  )
}


export default AddPinToBoard
