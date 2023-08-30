import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCommentThunk } from "../../store/comment";
import { deletePinThunk, getSinglePinThunk } from "../../store/pin";
import OpenModalButton from '../OpenModalButton';
import UpdatePinModal from "./UpdatePinModal";
import DeletePinModal from "./DeletePinModal";




const DeleteEditPin = ({ pinId, pin }) => {
  const dispatch = useDispatch()
  const history = useHistory();
  const { closeModal } = useModal();

  // console.log("this is the pinid-------->", pinId)

  const submitDelete = async (e) => {
    e.preventDefault()

    await dispatch(deletePinThunk(pinId))
    await dispatch(getSinglePinThunk(pinId))
    await closeModal();
  };



  return (
    <div>

      {/* {user && pinUser && ( */}

        <div className='delete-edit-pin'>
          <OpenModalButton
            buttonText="Delete"
            // onItemClick={closeMenu}
            modalComponent={<DeletePinModal pinId={pin.id} />}
          />
          <OpenModalButton
            buttonText="Edit"
            // onItemClick={closeMenu}
            modalComponent={<UpdatePinModal pin={pin} />}
          />
        </div>
      {/* )} */}
    </div>

  )

}


export default DeleteEditPin
