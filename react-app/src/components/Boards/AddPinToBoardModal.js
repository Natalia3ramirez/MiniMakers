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
  console.log("the boards", boardsArr)
  const pin = useSelector((state) => state.pins.singlePin)

  const userBoards = boardsArr.length ? boardsArr.filter(board => board.user_id === user.id) : [];

  console.log("filtered ----->", userBoards)
  console.log("the user boards----->", userBoards)
  const [board_id, setBoardId] = useState('');
  const [showMenu, setShowMenu] = useState(false);
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
    <div>
      {userBoards.length ? (

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

      )

      }



    </div>



  )

}


export default AddPinToBoard
