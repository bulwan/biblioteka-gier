import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../pages/gameDetails/gameDetails.css";

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
  const game = location.state?.game;
  const { id: gameId } = useParams();
  const [gameInfo, setGameInfo] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/games/${gameId}?key=2b4ab8ba5c2342b180e48f08be47c96d`)
      .then((response) => {
        setGameInfo(response.data);
      })
      .catch((error) => {
        console.error("Błąd pobierania informacji o grze:", error);
      });
  }, [gameId]);

  return (
    <div className="gameDetails__fullPage">
      <Sidebar />
      <div className="gameDetails">
        {gameInfo && (
          <div key={gameInfo.id} className="gameDetails__container">
            <div className="gameDetails__image">
              <img src={game.background_image} alt={game.name} />
            </div>
            <div className="gameDetails__rating">{game.metacritic}</div>
            <div className="gameDetails__title">{game.name}</div>
            <div className="gameDetails__infoContainer">
              <div className="infoContainer__releaseDate">
                <h1>Release date</h1>
                <p>{gameInfo.released}</p>
              </div>
              <div className="infoContainer__developer">
                <h1>Developers</h1>
                <p>
                  {gameInfo.developers
                    ? gameInfo.developers.map(
                        (developer: { name: string }) => developer.name
                      )
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
          <div className="gameDetails__buttonContainer">
            <div className="buttonContainer__completed">
              <button>
                <img src="src\images\completed-icon.png" alt="completed-icon" />
                Completed
              </button>
            </div>
            <div className="buttonContainer__playing">
              <button>
                <img src="src\images\playing-icon.png" alt="playing-icon" />
                Playing
              </button>
            </div>
            <div className="buttonContainer__inPlans">
              <button>
                <img src="src\images\inPlans-icon.png" alt="inPlans-icon" />
                In plans
              </button>
            </div>
            <div className="buttonContainer__abandoned">
              <button>
                <img src="src\images\abandoned-icon.png" alt="abandoned-icon" />
                Abandoned
              </button>
            </div>
          </div>
          <div className="gameDetails__addToLibrary">
            <button>
              Add to library
              <img
                src="src\images\addToLibrary-icon.png"
                alt="abandoned-icon"
              />
            </button>
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
)};
export default GameInformation;
