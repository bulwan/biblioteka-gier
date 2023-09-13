import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameCard from "./GameCard";
import "../pages/home/Home.css";
import { API_KEY } from "../../key.tsx";

function StatusDetails(props) {
  const params = useParams();

  const [gameList, setGameList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state

  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/users/${params.userID}?populate=*`)
      .then((response) => {
        const gameToFetch = [];
        for (const game of eval(`response.data.${params.name}`)) {
          gameToFetch.push(game.gameID);
        }
        const fetchGames = async () => {
          const games = [];
          for (const game of gameToFetch) {
            if (localStorage.getItem(game)) {
              games.push(JSON.parse(localStorage.getItem(game)));
            } else {
              try {
                const response = await axios.get(
                  `https://api.rawg.io/api/games/${game}?key=${API_KEY}`
                );
                games.push(response.data);
                localStorage.setItem(game, JSON.stringify(response.data));
              } catch (error) {
                console.log("An error occurred:", error);
              }
            }
          }
          setGameList(games);
          setIsLoading(false);
        };

        fetchGames();
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        setIsLoading(false);
      });
  }, [params.name]);

  return (
    <>
      <div className="home__content">
        <div className="home__title">
          <h1>{params.name}</h1>
        </div>
        <div className="home__subtitle">
          <h2>
            {params.username}'s games marked as {params.name}: {gameList.length}
          </h2>
        </div>
      </div>

      <div className="home__gameContainer">
        {!isLoading && gameList?.length !== 0 ? (
          gameList?.map((item) => (
            <GameCard
              key={item.id}
              id={item.id}
              image={item.background_image}
              rating={item.metacritic}
              title={item.name}
            />
          ))
        ) : isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>No games marked as {params.name}.</p>
        )}
      </div>
    </>
  );
}

export default StatusDetails;
