import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./SignupForm.css";


function hasEmptySpaces(string) {
	const regex = /\s/;
	return regex.test(string);
}

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
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
	const [submitted, setSubmitted] = useState(false)
	const { closeModal } = useModal();
	const [frontendErrors, setFrontendErrors] = useState({})


	useEffect(() => {
		const frontendErrors = {}
		if (!firstName || firstName.length < 2 || firstName.length > 50) {
			frontendErrors.firstName = "First Name must be between 2 and 50 characters"
		}
		if (hasEmptySpaces(firstName)) {
			frontendErrors.firstName = "Characters are required in the Name. No empty spaces"
		}
		if (!lastName || lastName.length < 2 || lastName.length > 50) {
			frontendErrors.firstName = "Last Name must be between 2 and 50 characters"
		}
		if (hasEmptySpaces(lastName)) {
			frontendErrors.lastName = "Characters are required in the Last Name"
		}
		if (!email.length || email.length < 5) {
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
		setSubmitted(true)

		const hasFrontendErrors = Object.keys(frontendErrors).length > 0;
		if (!hasFrontendErrors && password === confirmPassword) {

		const formData = new FormData();
		formData.append("first_name", firstName);
		formData.append("last_name", lastName);
		formData.append("about_me", aboutMe);
		formData.append("email", email);
		formData.append("password", password);
		formData.append("birthdate", birthdate);
		formData.append("image", image);

		setImageLoading(true);



			const data = await dispatch(signUp(formData));
		

			if (data) {
				setErrors(data);
			} else {
				await history.push('/home')
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
				{frontendErrors.firstName && submitted && <p className='on-submit-errors'>{frontendErrors.firstName}</p>}
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
				{frontendErrors.lastName && submitted && <p className='on-submit-errors'>{frontendErrors.lastName}</p>}
				<label className="about-me-label">
					About Me
					<textarea
						className="about-me-text"
						placeholder="Tell your story"
						type="text"
						value={aboutMe}
						onChange={(e) => setAboutMe(e.target.value)}
						required
					/>
					Describe yourself in 500 characters or less!
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
				{frontendErrors.email && submitted && <p className='on-submit-errors'>{frontendErrors.email}</p>}
				<label >
					Birthday
					<input
						type="date"
						value={birthdate}
						onChange={(e) => setBirthdate(e.target.value)}
						required
					/>
				</label>
				{frontendErrors.birthdate && submitted && <p className='on-submit-errors'>{frontendErrors.birthdate}</p>}
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
				{frontendErrors.password && submitted && <p className='on-submit-errors'>{frontendErrors.password}</p>}
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
				{frontendErrors.confirmPassword && submitted && <p className='on-submit-errors'>{frontendErrors.confirmPassword}</p>}
				<button type="submit">Sign Up</button>
				{(imageLoading) && <p>Loading...</p>}
			</form>
		</div>
	);
}

export default SignupFormModal;
