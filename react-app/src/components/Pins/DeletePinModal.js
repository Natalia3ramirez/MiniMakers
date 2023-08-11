import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deletePinThunk } from "../../store/pin";
import OpenModalButton from "../OpenModalButton";


const DeletePinModal = ({ pinId }) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const { closeModal } = useModal();

  // console.log("this is the pinid-------->", pinId)

  const submitDelete = async (e) => {
    e.preventDefault()

    await dispatch(deletePinThunk(pinId))
    await history.push('/home')
    await closeModal();
  };

  const submitCancel = () => {
    closeModal()
  };

  return (
    <div className='confirm-delete-container'>
      <h1>Are you sure?</h1>
      <p>If you delete this Pin, it'll be gone for good and those who've saved it won't be able to view it.</p>
      <div>
        <button type="sumbit" className='cancel-delete-pin' onClick={submitCancel}>
          Cancel
        </button>
        <button type="submit" className='delete-pin' onClick={submitDelete}>Delete</button>
      </div>
    </div>
  )


}


export default DeletePinModal
