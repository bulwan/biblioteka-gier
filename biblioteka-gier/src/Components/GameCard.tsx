import { NavLink } from "react-router-dom";
import "../pages/home/Home.scss";
interface gameCardProps {
  id:number;
  image:string;
  rating:string;
  title:string;
  platforms:string;

};
const gameCard: React.FC<gameCardProps> = ({
  id,
  image,
  rating,
  title,
  platforms,
}) => {
  const handleClick = (id:number) => {
    window.location.href = `/game/${id}`;
  };
  return (
    <div key = {id} className="gameCard" onClick={() => handleClick(id)}>
      <div className="gameCard__image">
        <img
          src={image}
        />
      </div>
      <div className="gameCard__rating">{rating}</div>
      <div className="gameCard__title"><NavLink to="/game" className="title__navlink">{title}</NavLink></div>
      <div className="gameCard__platforms">
        <img src={platforms}/>
        <img src={platforms}/>
        <img src={platforms}/>
      </div>
      <div className="gameCard__addToLibrary">
        <p>Add to library</p>
      </div>
    </div>
  );
};
export default gameCard;
