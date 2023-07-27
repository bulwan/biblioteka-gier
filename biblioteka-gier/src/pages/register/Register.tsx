function Register(props) {
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
					<p className="login--title">Register</p>

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
							type="text"
							placeholder="Username"
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
					<label>
						<br />
						<input
							type="password"
							placeholder="Confirm password"
							className="inputRegister"
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
