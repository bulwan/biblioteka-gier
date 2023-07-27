import "./login.css";
function Login(props) {
	const imagePath = `./src/images/${props.src}`;
	const divStyle = {
		background: `rgba(0, 0, 0, 0.5) url(${imagePath})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
	};
	return (
		<div className="login" style={divStyle}>
			<div className="login--container">
				<form>
					<p className="login--title">Login</p>
					<label>
						<br />
						<input
							type="email"
							placeholder="Email"
							className="inputRegister"
						/>
					</label>
					<br />
					<br />
					<label>
						<br />
						<input
							type="password"
							placeholder="Password"
							className="inputRegister"
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
