import { NavLink, useNavigate } from "react-router-dom";
import "../pages/home/Home.css";
interface gameCardProps {
	id: number;
	image: string;
	rating: string;
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
	return (
		<div key={id} className="gameCard" onClick={() => handleClick(id)}>
			<div className="gameCard__image">
				<img src={image} />
			</div>
			<div className="gameCard__rating">{rating}</div>
			<div className="gameCard__title">{title}</div>
			<div className="gameCard__platforms">{developers}</div>
			<div className="gameCard__addToLibrary">
				<p>Add to library</p>
			</div>
		</div>
	);
};
export default GameCard;
