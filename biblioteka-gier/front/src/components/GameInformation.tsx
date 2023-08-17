import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../pages/gameDetails/gameDetails.css";
import { API_KEY } from "../../key.jsx";
type gameInformationProps = {
  id: any;
  image: string;
  rating: string;
  title: string;
  platforms: string;
  description: string;
};
const GameInformation: React.FC<gameInformationProps> = () => {
  const location = useLocation();
  const { id: gameId } = useParams();
  const [gameInfo, setGameInfo] = useState<any>(null);

  useEffect(() => {
    if (gameId) {
      if (localStorage.getItem(gameId)) {
        let newGame = localStorage.getItem(gameId);
        if (newGame) {
          setGameInfo(JSON.parse(newGame));
          console.log("NIE MA ZAPYTANIA");
        }
      } else {
        console.log("JEST ZAPYTANIE");
        axios
          .get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`)
          .then((response) => {
            setGameInfo(response.data);
            localStorage.setItem(gameId, JSON.stringify(response.data));
            axios
              .get(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${API_KEY}`)
              .then((response) => {
                const cacheGame = JSON.parse(localStorage.getItem(gameId) || "{}");
                const newData = {
                  ...cacheGame,
                  screenshots: { ...response.data.results },
                };
                localStorage.setItem(gameId, JSON.stringify(newData));
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.error("Błąd pobierania informacji o grze:", error);
          });
      }
    }
  }, [gameId]);
  const ratingColor =
    gameInfo?.metacritic <= 49 ? "#f00" : gameInfo?.metacritic <= 74 ? "#fc3" : "#6c3";
  return (
    <div className="gameDetails__fullPage">
      <Sidebar />
      <div className="gameDetails">
        {gameInfo && (
          <div key={gameInfo.id} className="gameDetails__container">
            <div className="gameDetails__image">
              <img src={gameInfo.background_image} alt={gameInfo.name} />
            </div>
            {gameInfo.metacritic ? (
              <>
                <div className="gameDetails__rating" style={{ backgroundColor: ratingColor }}>
                  {gameInfo.metacritic}
                </div>{" "}
              </>
            ) : null}

            <div className="gameDetails__title">{gameInfo.name}</div>
            <div className="gameDetails__infoContainer">
              <div className="infoContainer__releaseDate">
                <h1>Release date</h1>
                <p>{gameInfo.released}</p>
              </div>
              <div className="infoContainer__developer">
                <h1>Developers</h1>
                <p>
                  {gameInfo.developers
                    ? gameInfo.developers.map((developer: { name: string }) => developer.name)
                    : ""}
                </p>
              </div>
              <div className="infoContainer__platforms">
                <h1></h1>
                <div className="platforms__images"></div>
              </div>
              <div className="infoContainer__genre">
                <h1>Genre</h1>
                <div className="genre__names">
                  <p>FPS</p>
                  <p>RPG</p>
                  <p>Adenture</p>
                </div>
              </div>
            </div>
            <div className="gameCard__addToCollections">
              <div className="gameCard__addToCollections-dropdown">
                <div className="gameCard__addToCollections-bigButton">
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
                <div className="gameCard__addToCollections-bigButton">
                  Add to collections <span>+</span>
                </div>
                <div className="gameCard__addToCollections-content">
                  <div className="dropdown-custom">Create collection</div>
                </div>
              </div>
            </div>

            <div className="gameDetails__screenshotsTitle">
              <h1>Screenshots</h1>
            </div>
            <div className="gameDetails__screenshotsContainer"></div>
            <div className="gameDetails_descriptionTitle">
              <h1>About</h1>
            </div>
            <div className="gameDetails_description">
              <h1>{gameInfo.description}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default GameInformation;
