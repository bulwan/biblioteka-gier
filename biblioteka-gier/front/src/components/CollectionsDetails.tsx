import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameCard from "./GameCard";
import "../pages/home/Home.css";

function CollectionDetail(props) {
	const params = useParams();
	const [collectionData, setCollectionData] = useState({});
	const [gameList, setGameList] = useState(null);
	const url = "http://localhost:1337";
	useEffect(() => {
		axios
			.get(
				`http://localhost:1337/api/collections/${params.id}?populate[games][populate]=*`
			)
			.then(response => {
				setCollectionData(response.data.data.attributes);
				const newCollections = [];
				for (const game of response.data.data.attributes.games.data) {
					console.log(response.data.data.attributes.games.data);
					newCollections.push({
						title: game.attributes.title,
						score: game.attributes.score,
						developers: game.attributes.developers,
						backgroundPicture:
							url +
							game.attributes.screenshots.data[0].attributes
								.formats.small.url,
					});
				}
				setGameList(newCollections);
			})
			.catch(error => {
				console.log("An error occurred:", error.response);
			});
	}, []);
	return (
		<>
			<div className="home__content">
				<div className="home__title">{collectionData.name}</div>
				<div className="home__subtitle">
					Gier w kolekcji: {gameList?.length}
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
export default CollectionDetail;
