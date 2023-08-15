import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { createNewBoardThunk, getAllBoardsThunk } from '../../store/board'
import './Boards.css'
import { useModal } from '../../context/Modal'

function hasEmptySpaces(string) {
	const regex = /\s/;
	return regex.test(string);
}


const CreateBoardModal = () => {

	const history = useHistory();
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const user = useSelector(state => state.session.user)

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [frontendErrors, setFrontendErrors] = useState({});
	const [errors, setErrors] = useState([]);
	const [submitted, setSubmitted] = useState(false)



	useEffect(() => {
		const frontendErrors = {}

		if (hasEmptySpaces(name)) {
			frontendErrors.name = "Characters are required in the name"
		}
		if (name.length < 3) {
			frontendErrors.name = "Name is must be at least 3 characters to create a Pin"
		}
		if (name.length > 50) {
			frontendErrors.name = "Name is must be 50 characters or less to create a Pin"
		}

		setFrontendErrors(frontendErrors)
	}, [name])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true)

		const formData = new FormData();
		formData.append("name", name);
		formData.append("description", description);
		formData.append('user_id', user.id)




		const data = await dispatch(createNewBoardThunk(formData));

		await dispatch(getAllBoardsThunk())


		if (data) {
			setErrors(data);
		} else if (frontendErrors.name) {
			setFrontendErrors(frontendErrors)
		} else {
			// await history.push('/profile')
			await closeModal();
		}

	};


	return (
		<div className="create-board-modal">
			<h1 className="modal-title">Create Board</h1>
			<form onSubmit={handleSubmit} encType="multipart/form-data">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>

				<div className="modal-label">Name</div>
				<input
					type="text"
					placeholder='Like "Activities for Kids" or "Recipes for Kids"'
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					className="modal-input"
				/>
				{frontendErrors.name && submitted && (
					<p className="modal-error">{frontendErrors.name}</p>
				)}

				<div className="modal-label">Description</div>
				<textarea
					type="text"
					placeholder="Tell everyone what your Board is about 😃"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="modal-textarea"
				/>

				<button type="submit" className="modal-button">
					Create
				</button>
			</form>
		</div>


	)

}


export default CreateBoardModal;
