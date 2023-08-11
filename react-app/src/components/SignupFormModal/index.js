import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [aboutMe, setAboutMe] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const [frontendErrors, setFrontendErrors] = useState({})


	useEffect(() => {
		const frontendErrors = {}
		if (firstName.length < 2) {
			frontendErrors.firstName = "First Name is required"
		}
		if (lastName.length < 2) {
			frontendErrors.lastName = "Last Name is required"
		}
		if (email.length < 2) {
			frontendErrors.email = "Email is required"
		}
		if (birthdate.length < 2) {
			frontendErrors.birthdate = "Birthdate is required"
		}
		if (password.length < 6) {
			frontendErrors.password = "Password must be at least 6 characters"
		}
		if (confirmPassword.length < 2) {
			frontendErrors.confirmPassword = "Confirm Password is required"
		}
		setFrontendErrors(frontendErrors)
	}, [email, firstName, lastName, confirmPassword, password])


	// console.log('PROFILE IMAGE--->', image)

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("first_name", firstName);
		formData.append("last_name", lastName);
		formData.append("about_me", aboutMe);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("birthdate", birthdate);
		formData.append("image", image);

		setImageLoading(true);



		if (password === confirmPassword) {
			const data = await dispatch(signUp(formData));


			if (data) {
				setErrors(data);
			} else {
				await closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};




	return (
		<div className='signup-modal-container'>
			<div className='signup-header'>
				<h1>Welcome to MiniMakers</h1>
				<p>Find new parenting tips to try</p>
			</div>
			<form onSubmit={handleSubmit}
				encType="multipart/form-data">
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					First Name
					<input
					placeholder="First Name"
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.firstName && firstName.length > 0 && <p className='on-submit-errors'>{frontendErrors.firstName}</p>}
				<label>
					Last Name
					<input
					placeholder="Last Name"
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.lastName && lastName.length > 0 && <p className='on-submit-errors'>{frontendErrors.lastName}</p>}
				<label>
					About Me
					<textarea
						placeholder="Tell your story"
						type="text"
						value={aboutMe}
						onChange={(e) => setAboutMe(e.target.value)}
						required
					/>
				</label>
				<label>
					Email
					<input
					placeholder="Email"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.email && email.length > 0 && <p className='on-submit-errors'>{frontendErrors.email}</p>}
				<label >
					Birthday
					<input
						type="date"
						value={birthdate}
						onChange={(e) => setBirthdate(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.birthdate && <p className='on-submit-errors'>{frontendErrors.birthdate}</p>}
				<label className='profile-image'>
					Profile Image
					<input
						type="file"
						accept="image/*, image/jpeg, image/jpg, image/gif"
						onChange={(e) => setImage(e.target.files[0])}
					/>
				</label>
				<label>
					Password
					<input
					placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.password && password.length > 0 && <p className='on-submit-errors'>{frontendErrors.password}</p>}
				<label>
					Confirm Password
					<input
					placeholder="Confirm Password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.confirmPassword && confirmPassword.length > 0 && <p className='on-submit-errors'>{frontendErrors.confirmPassword}</p>}
				<button type="submit">Sign Up</button>
				{(imageLoading) && <p>Loading...</p>}
			</form>
		</div>
	);
}

export default SignupFormModal;
