import "../pages/gameDetails/gameDetails.css";
import Sidebar from "./Sidebar";
type gameInformationProps = {
	id: any;
	image: string;
	rating: string;
	title: string;
	platforms: string;
};
const GameInformation: React.FC<gameInformationProps> = ({
	id,
	image,
	rating,
	title,
	platforms,
}) => {
	return (
		<div className="gameDetails__fullPage">
			<Sidebar />
			<div className="gameDetails">
				<div key={id} className="gameDetails__container">
					<div className="gameDetails__image">
						<img src={image} alt={title} />
					</div>
					<div className="gameDetails__rating">{rating}</div>
					<div className="gameDetails__title">{title}</div>
					<div className="gameDetails__infoContainer">
						<div className="infoContainer__releaseDate">
							<h1>Release date</h1>
							<p>2023-10-17</p>
						</div>
						<div className="infoContainer__developer">
							<h1>Developers</h1>
							<p>Remedy</p>
						</div>
						<div className="infoContainer__platforms">
							<h1>Platforms</h1>
							<div className="platforms__images">
								<img src={platforms} />
								<img src={platforms} />
								<img src={platforms} />
							</div>
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
								<img
									src="src\images\completed-icon.png"
									alt="completed-icon"
								/>
								Completed
							</button>
						</div>
						<div className="buttonContainer__playing">
							<button>
								<img
									src="src\images\playing-icon.png"
									alt="playing-icon"
								/>
								Playing
							</button>
						</div>
						<div className="buttonContainer__inPlans">
							<button>
								<img
									src="src\images\inPlans-icon.png"
									alt="inPlans-icon"
								/>
								In plans
							</button>
						</div>
						<div className="buttonContainer__abandoned">
							<button>
								<img
									src="src\images\abandoned-icon.png"
									alt="abandoned-icon"
								/>
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
					<div className="gameDetails__screenshotsContainer">
						<img
							src="src\images\game2-screenshots1.jpg"
							alt="game__screenshot1"
						></img>
						<img
							src="src\images\game2-screenshots2.jpg"
							alt="game__screenshot2"
						/>
					</div>
					<div className="gameDetails_descriptionTitle">
						<h1>About</h1>
					</div>
					<div className="gameDetails_description">
						<h1>
							The story follows bestselling thriller novelist Alan
							Wake, who has been trapped in an alternate dimension
							for 13 years, as he attempts to escape by writing a
							horror story involving an FBI agent named Saga
							Anderson.
						</h1>
					</div>
				</div>
			</div>
		</div>
	);
};
export default GameInformation;
