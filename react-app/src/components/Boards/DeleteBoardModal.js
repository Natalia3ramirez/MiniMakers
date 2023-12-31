import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteBoardThunk } from "../../store/board";
import OpenModalButton from "../OpenModalButton";


const DeleteBoardModal = ({ boardId }) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const { closeModal } = useModal();
  const board = useSelector((state) => state.pinnedBoards.singlePinnedBoard)


  const submitDelete = async (e) => {
    e.preventDefault()

    await dispatch(deleteBoardThunk(boardId))
    await history.push('/profile')
    await closeModal();
  };

  const submitCancel = () => {
    closeModal()
  };

  return (
    <div className='confirm-delete-container-boards'>
      <h1>Delete this board?</h1>
      <p>The board {board.name} and {board.pinLen} pins will be removed from your profile.</p>
      <div className='cancel-delete-board-buttons'>
        <button type="sumbit" className='cancel-delete-board' onClick={submitCancel}>
          Cancel
        </button>
        <button type="submit" className='delete-board' onClick={submitDelete}>Delete</button>
      </div>
    </div>
  )


}


export default DeleteBoardModal
