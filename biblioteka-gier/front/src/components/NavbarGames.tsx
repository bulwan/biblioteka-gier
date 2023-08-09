import { useNavigate } from "react-router-dom";
import "./Navbar.css";
type NavbarGamesProps = {
	id: any;
	image: string;
	rating: string;
	title: string;
	platforms: string;
};
const NavbarGames: React.FC<NavbarGamesProps> = ({
	id,
	image,
	rating,
	title,
	platforms,
}) => {
	const navigate = useNavigate();
	const handleClick = (id: number) => {
		navigate(`/game/${id}`);
	};
	return (
		<div className="gameList__container">
			<div className="gameList__gameCard" id={id} onClick={() => handleClick(id)}>
				<div className="gameCard__image">
					<img src={image} />
				</div>
				<div className="gameCard__title">{title}</div>
				<div className="gameCard__platforms">
					<img src={platforms} />
				</div>
				<div className="gameCard__rating">{rating}</div>
			</div>
		</div>
	);
};
export default NavbarGames;
