function ProfileHeader(props: { [key: string | number]: string | number }) {
	const backgroundSRC = `./src/images/${props.src}`;
	const avatarSRC = `./src/images/${props.avatarSRC}`;

	const divStyle = {
		background: `url(${backgroundSRC})`,
		backgroundSize: "cover",
		backgroundPosition: "0 30%",
	};
	return (
		<>
			<div className="profileHeader" style={divStyle}>
				<div className="profileHeader--avatarCard">
					<img src={avatarSRC}></img>
					<p className="profileHeader--avatarCard-username">
						t0mN00k_best
					</p>
				</div>
				<p className="profileHeader--backgroundSRC">
					Backgroud: Spider-man
				</p>
			</div>
		</>
	);
}
export default ProfileHeader;
