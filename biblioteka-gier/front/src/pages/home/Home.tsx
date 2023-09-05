import { Key, useCallback, useEffect, useState } from "react";
import GameCard from "../../components/GameCard";
import OrderBy from "../../components/OrderBy";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../components/Loading";
import { API_KEY } from "../../../key.tsx";
import { debounce } from "debounce";
function Home() {
  const [gamecard, setGamecard] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchValue, setFetchValue] = useState<string>("");
  const [titleValue, setTitleValue] = useState<string>("Home");
  const [orderByValue, setOrderByValue] = useState<string>("");
  const [endMessage, setEndMessage] = useState(""); 
  const goUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const fetchData = useCallback(
    async (page: number) => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&${fetchValue}&ordering=${orderByValue}`
        );
        const excludedTagIds = [44, 50, 15919, 60452];
        const gamesWithoutTags = response.data.results.filter((game: any) => {
          if (game.tags) {

            return !game.tags.some((tag: { id: number }) =>
              excludedTagIds.includes(tag.id)
            );
          } else {
            return true;
          }
        });
        if (gamesWithoutTags.length === 0) {
          setHasMore(false);
          setEndMessage("No more data to load.")
        } else {
          setGamecard((prevGamecard) =>
            page === 1
              ? [...gamesWithoutTags]
              : [...prevGamecard, ...gamesWithoutTags]
          );
          setCurrentPage(page + 1);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [fetchValue, orderByValue]
  );
  const updateValues = (newFetchValue: string, newTitleValue: string) => {
    setFetchValue(newFetchValue);
    setTitleValue(newTitleValue);
    setCurrentPage(1);
    setIsLoading(true);
    setGamecard([]);
    setOrderByValue("Pick Order");
  };
  const delayedFetchData = debounce((page: any) => fetchData(page), 0);
  useEffect(() => {
    delayedFetchData(1);
  }, [fetchValue, orderByValue]);
  return (
    <InfiniteScroll
        dataLength={gamecard.length}
        next={() => fetchData(currentPage+1)}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={endMessage}
        scrollableTarget="scrollableDiv"
      >
      <div className="home">
      <div className="home__title">
          <h1>{titleValue}</h1>
        </div>
        <div className="home__mainElements">
        <Sidebar updateValues={updateValues} />
          <div className="home__mainContainer">
          <OrderBy updateOrderByValue={setOrderByValue} />
            <div className="home__gameContainer" onClick={goUp}>
              {gamecard.map((elements: any) => (
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
