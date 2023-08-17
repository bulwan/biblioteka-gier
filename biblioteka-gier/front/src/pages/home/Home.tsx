import { Key, useEffect, useState } from "react";
import GameCard from "../../components/GameCard";
import OrderBy from "../../components/OrderBy";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../components/Loading";
import { API_KEY } from "../../../key.tsx";
import { Link } from "react-router-dom";
function Home() {
  const [gamecard, setGamecard] = useState<any>([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    axios
      .get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${currentPage}&page_size=50&metacritic=70,100`
      )
      .then((response) => {
        const newGames = gamecard;
        for (const game of response.data.results) {
          newGames.push(game);
        }
        if (response.data.results.length === 0) {
          setHasMore(false);
        } else {
          setGamecard(gamecard);
          setCurrentPage(currentPage + 1);
        }
        setIsLoading(false);
      })
      .catch((error) => {
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
      hasMore={hasMore && !isLoading}
      loader={<Loading />}
      endMessage={<p>No more data to load.</p>}>
      <div className="home">
        <h1 className="home__title">New Releases</h1>
        <div className="home__mainElements">
          <Sidebar />
          <div className="home__mainContainer">
            <OrderBy />
            <div className="home__gameContainer">
              {gamecard.map((elements: any, index: number) => (
                <GameCard
                  key={`gameCard-${elements.id}`}
                  id={elements.id}
                  image={elements.background_image}
                  rating={elements.metacritic}
                  title={elements.name}
                  developers={elements.developers}
                  platforms={elements.platforms}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </InfiniteScroll>
  );
}
export default Home;
