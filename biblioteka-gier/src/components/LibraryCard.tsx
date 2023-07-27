import "../pages/userProfile/userProfile.css";
function LibraryCard(props: { [key: string | number]: string | number }) {
	const imagePath = `./src/images/${props.src}`;

	const divStyle = {
		background: `url(${imagePath})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
	};
	return (
		<>
			<div className="libraryCard">
				<h2 className="libraryCard--title">{props.title}</h2>
				<div className="libraryCard--content" style={divStyle}>
					<div className="libraryCard--content-total">
						Total games <br />
						<p className="libraryCard--content-number">
							{props.value}
						</p>
					</div>
				</div>
				<p className="libraryCard--backgroudSRC">
					<b>Background: </b>
					{props.backgroudSRC}
				</p>
			</div>
		</>
	);
}
export default LibraryCard;
