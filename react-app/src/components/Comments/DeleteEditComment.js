import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCommentThunk } from "../../store/comment";
import { getSinglePinThunk } from "../../store/pin";




const DeleteEditComment = ({ commentId, pinId }) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const { closeModal } = useModal();

  // console.log("this is the pinid-------->", pinId)

  const submitDelete = async (e) => {
    e.preventDefault()

    await dispatch(deleteCommentThunk(commentId))
    await dispatch(getSinglePinThunk(pinId))
    await closeModal();
  };



  return (
    <div className='confirm-delete-comment-container'>
      <div>
        <button type="submit" className='delete-comment' onClick={submitDelete}>Delete</button>
      </div>
    </div>
  )

}


export default DeleteEditComment
