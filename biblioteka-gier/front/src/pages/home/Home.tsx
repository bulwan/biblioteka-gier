import GameCard from "../../components/GameCard";
import OrderBy from "../../components/OrderBy";
import Sidebar from "../../components/Sidebar";
import exampleObject from "./examples";

function Home() {
	return (
		<div className="home">
			<h1 className="home__title">New Releases</h1>
			<div className="home__mainElements">
				<Sidebar />
				<div className="g">
					<OrderBy />
					<div className="home__gameContainer">
						{exampleObject.map(elements => (
							<GameCard
								key={elements.key}
								id={elements.key}
								image={elements.image}
								rating={elements.rating}
								title={elements.title}
								developers={elements.developers}
								platforms={elements.platforms}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
export default Home;
