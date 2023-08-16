import { Key, useEffect, useState } from "react";
import GameCard from "../../components/GameCard";
import OrderBy from "../../components/OrderBy";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
function Home() {
    const [gamecard, setGamecard] = useState<any>([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = () => {
        axios
            .get(
                `https://api.rawg.io/api/games?key=63a39ad053c946faa4c38e1b26c581e4&page=${currentPage}&page_size=15&metacritic=70,100`
            )
            .then((response) => {
                const newGames = gamecard;
                for (const game of response.data.results) {
                    newGames.push(game);
                    // localStorage.setItem(game.id, JSON.stringify(game));
                }
                setGamecard(newGames);
                setCurrentPage(() => currentPage + 1);
            })
            .catch((error) => {
                setError(error);
                console.log(error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <InfiniteScroll
            dataLength={gamecard.length}
            next={fetchData}
            hasMore={true}
            loader={<Loading />}
            endMessage={<p>No more data to load.</p>}>
            <div className="home">
                <div className="home__mainElements">
                    <Sidebar />
                    <div className="home__mainContainer">
                        <OrderBy />
                        <div className="home__gameContainer">
                            {gamecard.map((elements: any) => (
                                <Link
                                    to={`/game/${elements.id}`}
                                    state={{ game: elements }}
                                    key={elements.id}
                                    className="gameContainer__link">
                                    <GameCard
                                        key={elements.id}
                                        id={elements.id}
                                        image={elements.background_image}
                                        rating={elements.metacritic}
                                        title={elements.name}
                                        developers={elements.developers}
                                        platforms={elements.platforms}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </InfiniteScroll>
    );
}

export default Home;
