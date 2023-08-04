import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { setAuthToken } from "../../components/setAuthToken";
function Login(props) {
	const navigate = useNavigate();
	const imagePath = `./src/images/${props.src}`;
	const divStyle = {
		background: `rgba(0, 0, 0, 0.5) url(${imagePath})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
	};
	const initialValue = {
		identifier: "",
		password: "",
	};

	const [data, setData] = useState(initialValue);

	const handleChange = event => {
		const { name, value } = event.target;
		setData(prevData => ({
			...prevData,
			[name]: value,
		}));
	};
	const login = async e => {
		e.preventDefault();
		const user = {
			identifier: data.identifier,
			password: data.password,
		};
		await axios
			.post("http://localhost:1337/api/auth/local", user)
			.then(response => {
				const token = response.data.jwt;
				localStorage.setItem("token", token);
				setAuthToken(token);
				navigate("/me");
			})
			.catch(error => {
				console.log("An error occurred:", error.response);
			});
	};

	return (
		<div className="login" style={divStyle}>
			<div className="login--container">
				<form onSubmit={login}>
					<p className="login--title">Login</p>
					<label>
						<br />
						<input
							type="text"
							placeholder="Email"
							name="identifier"
							className="inputRegister"
							value={data.identifier}
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
					<button className="buttonRegister">Login</button>
					<br />
					<br />
					<button className="buttonGoLogin">
						Don't have an account?{" "}
						<span className="buttonGoLogin--link">Sign up.</span>
					</button>
					<br />
					<br />
					<button className="buttonForgott">
						Forgot your password?
					</button>
				</form>
			</div>
		</div>
	);
}
export default Login;
