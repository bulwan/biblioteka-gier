import "../pages/userProfile/userProfile.css";
import { useNavigate } from "react-router-dom";
function CollectionCard(props: { [key: string | number]: string | number }) {
	const navigate = useNavigate();
	const handleClick = (id: number) => {
		navigate(`/collection/${id}`);
	};
	return (
		<>
			<div
				className="collectionCard"
				onClick={() => handleClick(Number(props.id))}
			>
				<h2 className="collectionCard--title">{props.title}</h2>
				<div
					className="collectionCard--content"
					style={{ background: `url(${props.src})` }}
				>
					<div className="collectionCard--content-total">
						Total games <br />
						<p className="collectionCard--content-number">
							{props.value}
						</p>
					</div>
				</div>
				<p className="collectionCard--backgroudSRC">
					<b>Background: </b>
					{props.backgroudSRC}
				</p>
			</div>
		</>
	);
}
export default CollectionCard;
