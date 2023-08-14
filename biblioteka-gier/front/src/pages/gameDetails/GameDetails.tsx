import GameInformation from "../../Components/GameInformation";
import SideBar from "../../Components/Sidebar";
import "./gameDetails.scss";
import { useParams } from 'react-router-dom';
import example from "../home/example"
import { useEffect, useState } from "react";
function GameDetails() {
  const params = useParams();
  const gameId:any = params.id;
  const [game,setGame] = useState('')
  console.log(gameId);
  
    useEffect(()=> {
for(let elements of example) {
        if (elements.key == gameId) {
          setGame(elements)
        }
      }
      console.log(game)
    }, [])
    
  return (
    <div className="gameDetails">
      <div className="gameDetails__mainElements">
        <SideBar/>
       <GameInformation
       id = {game.id}
       image = {game.image}
       rating= {game.rating}
       title= {game.title}
       platforms= {game.platforms}
       />
      </div>
    </div>
  );
}
export default GameDetails;
