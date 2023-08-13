import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { createNewBoardThunk, getAllBoardsThunk } from '../../store/board'
import './Boards.css'
import { useModal } from '../../context/Modal'


const CreateBoardModal = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user)

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
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

		const formData = new FormData();
		formData.append("name", name);
		formData.append("description", description);
    formData.append('user_id', user.id)




		const data = await dispatch(createNewBoardThunk(formData));
    await dispatch(getAllBoardsThunk())

		if (data) {
			setErrors(data);
		} else {
      await history.push('/profile')
			await closeModal();
		}

	};


  return (
    <div>
      <h1>Create board</h1>
      <form onSubmit={handleSubmit}
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

			</form>

    </div>



  )

}


export default CreateBoardModal;
