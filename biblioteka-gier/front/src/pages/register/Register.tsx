import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../login/login.css";
import { useState } from "react";
import { setAuthToken } from "../../components/setAuthToken";
function Register(props) {
	const navigate = useNavigate();
	const [userID, setUserID] = useState();
	const imagePath = `./src/images/${props.src}`;
	const divStyle = {
		background: `rgba(0, 0, 0, 0.5) url(${imagePath})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
	};
	const initialValue = {
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
	};

	const [data, setData] = useState(initialValue);

	const handleChange = e => {
		const { name, value } = e.target;
		setData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};

	const createBasicCollections = () => {
		const defaultCollections = [
			"Completed",
			"Playing",
			"In plans",
			"Abandoned",
		];
		for (let i = 0; i < defaultCollections.length; i++) {
			axios
				.post("http://localhost:1337/api/collections", {
					data: {
						name: defaultCollections[i],
						isCustomList: false,
						user: userID,
					},
				})
				.then(response =>
					console.log("ZROBILY SIE TE KOLEKCJE ", response)
				)
				.catch(error => {
					console.log(error.response);
				});
		}
	};

	const register = async e => {
		e.preventDefault();
		if (data.password === data.passwordConfirm) {
			const userData = {
				username: data.username,
				email: data.email,
				password: data.password,
			};
			await axios
				.post("http://localhost:1337/api/auth/local/register", userData)
				.then(response => {
					const token = response.data.jwt;
					localStorage.setItem("token", response.data.jwt);
					setAuthToken(token);
					setUserID(response.data.user.id);
					navigate("/me");
					console.log(response.data);
					const defaultCollections = [
						"Completed",
						"Playing",
						"In plans",
						"Abandoned",
					];
					for (let i = 0; i < defaultCollections.length; i++) {
						axios
							.post("http://localhost:1337/api/collections", {
								data: {
									name: defaultCollections[i],
									isCustomList: false,
									user: response.data.user.id,
								},
							})
							.then(response => console.log(response))
							.catch(error => {
								console.log(error.response);
							});
					}
				})
				.catch(error => {
					console.log("An error occurred:", error.response);
				});
		} else {
			console.log("Password doesn't match.");
		}
	};
	return (
		<div className="login" style={divStyle}>
			<div className="login--container">
				<form onSubmit={register}>
					<p className="login--title">Register</p>

					<label>
						<br />
						<input
							type="email"
							placeholder="Email"
							name="email"
							className="inputRegister"
							value={data.email}
							onChange={handleChange}
						/>
					</label>
					<br />
					<br />
					<label>
						<br />

						<input
							type="text"
							placeholder="Username"
							name="username"
							className="inputRegister"
							value={data.username}
							onChange={handleChange}
						/>
					</label>
					<br />
					<br />
					<label>
						<br />

						<input
							type="password"
							placeholder="Password"
							name="password"
							className="inputRegister"
							value={data.password}
							onChange={handleChange}
						/>
					</label>
					<br />
					<br />
					<label>
						<br />
						<input
							type="password"
							name="passwordConfirm"
							placeholder="Confirm password"
							className="inputRegister"
							value={data.passwordConfirm}
							onChange={handleChange}
						/>
					</label>
					<br />
					<br />
					<button className="buttonRegister">Register</button>
					<br />
					<button className="buttonGoLogin">
						Already registered?{" "}
						<span className="buttonGoLogin--link">Sign in.</span>
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;
