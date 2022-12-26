import { useState } from "react";
import { useDispatch } from 'react-redux';
import { FORM_AUTHORIZATION_CLOSE, LOG_IN } from "../../RTK/reducers";

export const LOG_IN_DATA = {
	username: 'antonstrkv',
	password: '1234',
}

const CreateAuthorizationForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();


	const loginVerification = (e) => {
		if (LOG_IN_DATA.username === username && LOG_IN_DATA.password === password) {
			dispatch(LOG_IN());
			dispatch(FORM_AUTHORIZATION_CLOSE());
			e.preventDefault();
		} else {
			alert("Incorrect username or password");
			e.preventDefault();
		}
	}


	return (
		<div className="modal" id="modal-name" >
			<div className="modal-sandbox" ></div>
			<div className="wrapper fadeInDown">
				<div id="formContent">
					<div className="close-modal-1" onClick={() => { dispatch(FORM_AUTHORIZATION_CLOSE()); }}>&#10006;</div>
					<h2 className="active"> Login </h2>
					<h2 className="inactive underlineHover">Sign Up </h2>


					<form onSubmit={loginVerification}>
						<input type="text" id="login" className="fadeIn second" name="login" placeholder="login"
							onChange={(e) => { setUsername(e.target.value) }} />
						<input type="text" id="password" className="fadeIn third" name="login" placeholder="password"
							onChange={(e) => { setPassword(e.target.value) }} />
						<input type="submit" className="fadeIn fourth" value="Log In" />
					</form>

					<div id="formFooter">
						<a className="underlineHover" href="index.html">Forgot Password?</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export { CreateAuthorizationForm };