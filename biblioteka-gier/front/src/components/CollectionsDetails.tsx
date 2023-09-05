import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameCard from "./GameCard";
import "../pages/home/Home.css";
import { API_KEY } from "../../key.tsx";

function CollectionDetail() {
  const params = useParams();
  const [collectionData, setCollectionData] = useState({});
  const navigate = useNavigate();
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectionName, setCollectionName] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/collections/${params.id}?populate[games][populate]=*`)
      .then(async (response) => {
        setCollectionName(response.data.data.attributes.name);
        const gameToFetch = [];
        for (const game of response.data.data.attributes.games.data) {
          gameToFetch.push(game.attributes.gameID);
        }
        console.log(gameToFetch);

        const gamePromises = gameToFetch.map(async (game) => {
          if (JSON.parse(localStorage.getItem(game))) {
            return JSON.parse(localStorage.getItem(game));
          } else {
            const response = await axios.get(
              `https://api.rawg.io/api/games/${game}?key=${API_KEY}`
            );
            localStorage.setItem(game, JSON.stringify(response.data));
            return response.data;
          }
        });

        const fetchedGames = await Promise.all(gamePromises);
        setGameList(fetchedGames);
        setLoading(false);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  }, []);
  const deleteCollection = () => {
    axios
      .delete(`http://localhost:1337/api/collections/${params.id}`)
      .then((response) => {
        navigate("/me");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="home__content">
        <div className="home__title">{collectionName}</div>
        <div className="home__subtitle">Games in collection: {gameList?.length}</div>
        <div className="button button__delete" onClick={() => deleteCollection()}>
          Delete collection
        </div>
      </div>

      <div className="home__gameContainer">
        {!loading
          ? gameList?.map((item) => (
              <GameCard
                key={item.id}
                id={item.id}
                image={item.background_image}
                rating={item.metacritic}
                title={item.name}
              />
            ))
          : null}
      </div>
    </>
  );
}
export default CollectionDetail;
