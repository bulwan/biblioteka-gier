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
    //const [images, setImages] = useState({});

    useEffect(() => {
        if (localStorage.getItem(gameId)) {
            let newGame = localStorage.getItem(gameId);
            setGameInfo(JSON.parse(newGame));
            console.log("NIE MA ZAPYTANIA");
        } else {
            console.log("JEST ZAPYTANIE");
            axios
                .get(`https://api.rawg.io/api/games/${gameId}?key=63a39ad053c946faa4c38e1b26c581e4`)
                .then((response) => {
                    setGameInfo(response.data);
                    localStorage.setItem(gameId, JSON.stringify(response.data));
                    axios
                        .get(
                            `https://api.rawg.io/api/games/${gameId}/screenshots?key=63a39ad053c946faa4c38e1b26c581e4`
                        )
                        .then((response) => {
                            const cacheGame = JSON.parse(localStorage.getItem(gameId));
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
                    console.log(error);
                });
        }
    }, [gameId]);
    //console.log(gameInfo.screenshots);
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
                                        ? gameInfo.developers.map((developer: { name: string }) => (
                                              <p>{developer.name}</p>
                                          ))
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
                                    {gameInfo.genres
                                        ? gameInfo.genres.map((genres: { name: string }) => (
                                              <p>{genres.name}</p>
                                          ))
                                        : ""}
                                </div>
                            </div>
                        </div>
                        <div className="gameCard__addToCollections">
                            <div className="gameCard__addToCollections-dropdown">
                                <div className="gameCard__addToCollections-button">
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
                                <div className="gameCard__addToCollections-button">
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
                            <h1>{gameInfo.description_raw}</h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default GameInformation;
