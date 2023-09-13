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
  const [owner, setOwner] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/collections/${params.id}?populate=user,games`)
      .then(async (response) => {
        setOwner(response.data.data.attributes.user.data.attributes.username);
        setCollectionName(response.data.data.attributes.name);
        const gameToFetch = [];
        for (const game of response.data.data.attributes.games.data) {
          gameToFetch.push(game.attributes.gameID);
        }

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
      .then(() => {
        navigate("/me");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="home__content">
        <div className="home__title">
          <h1>{collectionName}</h1>
        </div>
        <div className="home__subtitle">
          <h2>Games in collection: {gameList?.length}</h2>
        </div>
        {owner === JSON.parse(sessionStorage.getItem("me")).username ? (
          <div className="deleteFromCollection" onClick={() => deleteCollection()}>
            Delete collection
          </div>
        ) : null}
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
