import "./gameDetails.scss";
import { useParams } from 'react-router-dom';
import example from "../home/example"
import { useEffect, useState } from "react";
import axios from "axios";
import GameInformation from "../../components/GameInformation";
function GameDetails() {
  const params = useParams();
  const gameId:any = params.id;
  const [error, setError] = useState(null);
  const [game,setGame] = useState<any>([])
  const [gry, teGry] = useState<any>([]);
  const getData = async () => {axios
		.get("http://localhost:1337/api/games")
		.then(({ data }) => {
		setGame(data.data);
		})
		.catch((error) => {
		console.log(error)
		setError(error);
		})
	  }
	  useEffect(() => {
      getData();
    }, []);
  
    useEffect(() => {
      const foundGame = game.find((element: any) => element.id == gameId);
      if (foundGame) {
        teGry(foundGame);
      }
    }, [gameId, game]);
  return (
    <div className="gameDetails">
      <div className="gameDetails__mainElements">
        <SideBar/>
       <GameInformation
       id = {gry.id}
       image = {gry.image}
       rating= {gry.rating}
       title= {gry.title}
       platforms= {gry.platforms}
       description = {gry.description}
       />
      </div>
    </div>
  );
}
export default GameDetails;
