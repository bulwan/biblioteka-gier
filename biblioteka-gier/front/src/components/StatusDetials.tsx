import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameCard from "./GameCard";
import "../pages/home/Home.css";

function StatusDetails(props) {
	const params = useParams();
	const [gameList, setGameList] = useState(null);
	useEffect(() => {
		axios
			.get("http://localhost:1337/api/users/me?populate=*")
			.then(response => {
				eval(`setGameList(response.data.${params.name});`);
			})
			.catch(error => {
				console.log("An error occurred:", error.response);
			});
	}, []);
	return (
		<>
			<div className="home__content">
				<div className="home__title">{params.name}</div>
				<div className="home__subtitle">
					{/* Gier w kolekcji: {props.data.length} */}
				</div>
			</div>

			<div className="home__gameContainer">
				{" "}
				{gameList?.length !== 0 ? (
					gameList?.map(item => (
						<GameCard
							key={item.key}
							id={item.key}
							image={item.backgroundPicture}
							rating={item.rating}
							title={item.title}
							platforms={item.platforms}
							developers={item.developers}
						/>
					))
				) : (
					<p>Kolekcja jest pusta. Dodaj jakąś grę! </p>
				)}
			</div>
		</>
	);
}
export default StatusDetails;
