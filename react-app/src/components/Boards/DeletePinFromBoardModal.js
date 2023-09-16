import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteBoardThunk, deletePinFromBoardThunk } from "../../store/board";
import OpenModalButton from "../OpenModalButton";


const DeletePinFromBoard = ({ boardId, pinId }) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const { closeModal } = useModal();
  const board = useSelector((state) => state.pinnedBoards.singlePinnedBoard)


  const submitDelete = async (e) => {
    e.preventDefault()

    await dispatch(deletePinFromBoardThunk(boardId, pinId))
    await history.push(`/boards/${boardId}`)
    await closeModal();
  };

  const submitCancel = () => {
    closeModal()
  };

  return (
    <div className='confirm-delete-pin-container'>
      <h1>Are you sure?</h1>
      <p>Once you delete a Pin from a Board, you can't undo it!</p>
      <div className='cancel-delete-pin-from-board'>
        <button type="sumbit" className='cancel-delete-pin' onClick={submitCancel}>
          Cancel
        </button>
        <button type="submit" className='delete-board' onClick={submitDelete}>Delete</button>
      </div>
    </div>
  )


}


export default DeletePinFromBoard
