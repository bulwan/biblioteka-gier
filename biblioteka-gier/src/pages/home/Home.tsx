import "./Home.scss";
import OrderBy from "../../Components/OrderBy";
import GameCard from "../../Components/GameCard";
import SideBar from "../../Components/Sidebar";
import example from "./example"
const Home = () => {
  return (
    <div className="home">
      <h1 className="home__title">New Releases</h1>
      <div className="home__mainElements">
        <SideBar />
        <div className="home__orderBy">
          <OrderBy />
          <div className="home__gameContainer">
            {
            example.map(elements => (
              <GameCard
              id={elements.key}
              image={elements.image}
              rating={elements.rating}
              title={elements.title}
              platforms={elements.platforms}
            />  
            ))
}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
