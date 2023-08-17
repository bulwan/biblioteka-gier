import { NavLink, useNavigate } from "react-router-dom";
import "../pages/home/Home.css";
interface gameCardProps {
	id: any;
	image: string;
	rating: number;
	title: string;
	platforms: string;
	developers: string;
}
const GameCard: React.FC<gameCardProps> = ({
	id,
	image,
	rating,
	title,
	platforms,
	developers,
}) => {
	const navigate = useNavigate();
	const handleClick = (id: number) => {
		navigate(`/game/${id}`);
	};
	const ratingColor = rating <= 49 ? '#f00' : rating <= 74 ? '#fc3' : '#6c3';
	return (
		<div key={id} className="gameCard">
			<div className="gameCard-clickable" onClick={() => handleClick(id)}>
				<div className="gameCard__image">
					<img src={image} />
				</div>
				<div className="gameCard__rating" style={{ backgroundColor: ratingColor }}>{rating}</div>
				<div className="gameCard__title">{title}</div>
				<div className="gameCard__platforms">{developers}</div>
			</div>
			<div className="gameCard__addToCollections">
				<div className="gameCard__addToCollections-dropdown">
					<div className="gameCard__addToCollections-button">
						Change a status <span>+</span>
					</div>
					<div className="gameCard__addToCollections-content">
						<div>Completed</div>
						<div>In plans</div>
						<div>Playing</div>
						<div>Abandoned</div>
					</div>
				</div>
				<div className="gameCard__addToCollections-dropdown">
					<div className="gameCard__addToCollections-button">
						Add to collections <span>+</span>
					</div>
					<div className="gameCard__addToCollections-content">
						<div className="dropdown-custom">Create collection</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default GameCard;
