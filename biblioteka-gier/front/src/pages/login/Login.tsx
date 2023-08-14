import { useForm } from "react-hook-form";
import { setAuthToken } from "../../components/setAuthToken";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { useState } from "react";

function Login2(props) {
	const divStyle = {
		background: `rgba(0, 0, 0, 0.5) url("./src/images/${props.src}")`,
		backgroundSize: "cover",
		backgroundPosition: "center",
	};
	type Inputs = {
		identifier: string;
		password: string;
	};
	const [message, setMessage] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<Inputs> = user => {
		axios
			.post("http://localhost:1337/api/auth/local", user)
			.then(response => {
				const token = response.data.jwt;
				localStorage.setItem("token", token);
				setAuthToken(token);
				navigate("/me");
			})
			.catch(error => {
				console.log(error.response);
				setMessage(error.response.data.error.message);
			});
	};
	return (
		<>
			<div className="login" style={divStyle}>
				<div className="login--container">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="login--title-container">
							<p className="login--title">Login</p>
							<div className="login--containter-errors-center">
								{message}
							</div>
						</div>

						<div className="input-div">
							<input
								className="inputRegister"
								placeholder="Email or username"
								{...register("identifier", { required: true })}
							/>
							<br />{" "}
							{errors.identifier && (
								<div className="login--containter-errors">
									identifier field is required
								</div>
							)}
						</div>
						<div className="input-div">
							<input
								className="inputRegister"
								type="password"
								placeholder="Password"
								{...register("password", { required: true })}
							/>
							<br />
							{errors.password && (
								<div className="login--containter-errors">
									password field is required
								</div>
							)}
						</div>
						<br />
						<br />
						<input
							className="buttonRegister"
							type="submit"
							value="Sign in."
						/>
					</form>
					<NavLink className="buttonGoLogin" to="/register">
						Don't have an account?{" "}
						<span className="buttonGoLogin--link">Sign up.</span>
					</NavLink>
					<br />
					<br />
					<button className="buttonForgott">
						Forgot your password?
					</button>
				</div>
			</div>
		</>
	);
}
export default Login2;
