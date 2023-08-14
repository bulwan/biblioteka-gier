import { useState } from "react";
function ProfileHeader(props: { [key: string | number]: string | number }) {
	const divStyle = {
		background: `url(${props.src})`,
	};

	return (
		<>
			<div className="profileHeader" style={divStyle}>
				<div className="profileHeader--avatarCard">
					<img src={props.avatarSRC}></img>
					<p className="profileHeader--avatarCard-username">
						{props.username}
					</p>
				</div>
				<p className="profileHeader--backgroundSRC">
					Backgroud: nazwa gry
				</p>
			</div>
		</>
	);
}
export default ProfileHeader;
