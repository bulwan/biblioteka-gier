import { useForm } from "react-hook-form";
import { setAuthToken } from "../../components/setAuthToken";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../login/login.css";
import { useState } from "react";
function Register2(props) {
	const divStyle = {
		background: `rgba(0, 0, 0, 0.5) url("./src/images/${props.src}")`,
		backgroundSize: "cover",
		backgroundPosition: "center",
	};
	type Inputs = {
		email: string;
		username: string;
		password: string;
		confirm_password: string;
	};
	const [message, setMessage] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

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
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<Inputs> = user => {
		if (user.password !== user.confirm_password) {
			setMessage("Passwords do not match");
			return 1;
		}
		axios
			.post("http://localhost:1337/api/auth/local/register", user)
			.then(response => {
				const token = response.data.jwt;
				localStorage.setItem("token", token);
				setAuthToken(token);
				navigate("/me");
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
							<p className="login--title">Register</p>
							<div className="login--containter-errors-center">
								{message}
							</div>
						</div>

						<div className="input-div">
							<input
								className="inputRegister"
								placeholder="Email"
								type="email"
								{...register("email", { required: true })}
							/>
							<br />{" "}
							{errors.email && (
								<div className="login--containter-errors">
									Email field is required
								</div>
							)}
						</div>
						<div className="input-div">
							<input
								className="inputRegister"
								placeholder="username"
								type="text"
								{...register("username", { required: true })}
							/>
							<br />{" "}
							{errors.username && (
								<div className="login--containter-errors">
									Username field is required
								</div>
							)}
						</div>
						<div className="input-div">
							<input
								className="inputRegister"
								type="password"
								placeholder="Password"
								{...register("password", {
									required: true,
								})}
							/>
							<br />
							{errors.password && (
								<div className="login--containter-errors">
									password field is required
								</div>
							)}
						</div>
						<div className="input-div">
							<input
								className="inputRegister"
								type="password"
								placeholder="Confirm password"
								{...register("confirm_password", {
									required: true,
								})}
							/>
							<br />
							{errors.confirm_password && (
								<div className="login--containter-errors">
									Confirm your password
								</div>
							)}
						</div>
						<br />
						<br />
						<input
							className="buttonRegister"
							type="submit"
							value="Sign up."
						/>
					</form>
					<NavLink className="buttonGoLogin" to="/login">
						Already registered?{" "}
						<span className="buttonGoLogin--link">Sign in.</span>
					</NavLink>
				</div>
			</div>
		</>
	);
}
export default Register2;
