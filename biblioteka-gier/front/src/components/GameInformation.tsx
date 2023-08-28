import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../pages/gameDetails/gameDetails.css";
import { API_KEY } from "../../key.jsx";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import StatusDropdown from "./StatusDropdown.js";
import CollectionList from "./CollectionList.js";
type gameInformationProps = {
  id: any;
  image: string;
  rating: string;
  title: string;
  platforms: string;
  description: string;
};
const GameInformation: React.FC<gameInformationProps> = () => {
  const { id } = useParams();
  const gameId: string = String(id);
  const [gameInfo, setGameInfo] = useState<any>(null);
  const [screenshots, setScreenshots] = useState([]);
  const [collections, setCollections] = useState([]);
  console.log(screenshots);
  const fetchGameInfo = async () => {
    try {
      const response = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
      setGameInfo(response.data);
      localStorage.setItem(gameId, JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchScreenshots = async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${gameId}/screenshots?key=${API_KEY}`
      );
      const cacheGame = JSON.parse(localStorage.getItem(gameId) || "{}");
      const newData = {
        ...cacheGame,
        screenshots: response.data.results,
      };
      localStorage.setItem(gameId, JSON.stringify(newData));
      setScreenshots(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

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
        fetchGameInfo();
      }
    }
  }, [gameId]);

  useEffect(() => {
    setCollections(JSON.parse(sessionStorage.getItem("collections")));
    if (gameId) {
      fetchScreenshots();
    }
  }, [gameId]);
  const ratingColor =
    gameInfo?.metacritic <= 49 ? "#f00" : gameInfo?.metacritic <= 74 ? "#fc3" : "#6c3";
  const gallery = screenshots.map((screenshot: any) => ({
    original: screenshot.image,
    thumbnail: screenshot.image,
  }));
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
                </div>
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
                  {gameInfo.developers &&
                    gameInfo.developers.length > 0 &&
                    gameInfo.developers[0].name}
                </p>
              </div>
              <div className="infoContainer__platforms">
                <h1></h1>
                <div className="platforms__images"></div>
              </div>
              <div className="infoContainer__genre">
                <h1>Genre</h1>
                <div className="genre__names">
                  {gameInfo.genres.slice(0, 3).map((genre: { name: string }) => (
                    <p key={genre.name}>{genre.name}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="gameCard__addToCollections">
              <div className="gameCard__addToCollections-dropdown">
                Manage <b>{gameInfo.name}'s</b> status:
                <br />
                <br />
                <br />
                <StatusDropdown id={id} />
              </div>
              <div className="gameCard__addToCollections-dropdown">
                Manage <b>{gameInfo.name}</b> in your collections:
                <br />
                <br />
                {collections.map((item) => (
                  <div key={item.id}>
                    <CollectionList name={item.name} key={item.id} id={id} collection={item} />
                  </div>
                ))}
              </div>
            </div>
            <div className="gameDetails__screenshotsTitle">
              <h1>Screenshots</h1>
            </div>
            <div className="gameDetails__screenshotsContainer">
              <Carousel showThumbs={false}>
                {gallery.map((screenshot: any) => (
                  <div key={screenshot.id}>
                    <img src={screenshot.original} alt="Screenshot" />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="gameDetails_descriptionTitle">
              <h1>About</h1>
            </div>
            <div className="gameDetails_description">
              <h1>{gameInfo.description.replace(/<\/?[^>]+(>|$)/g, "")}</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default GameInformation;
