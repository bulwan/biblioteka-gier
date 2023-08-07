
import "./Navbar.scss"
const NavbarGames = (props: any) => {
  return (
    <div className="gameList__container">
      <div className="gameList__gameCard" id={props.key}>
        <div className="gameCard__image"><img src={props.image}/></div>
        <div className="gameCard__title">{props.title}</div>
        <div className="gameCard__platforms"><img src={props.platforms}/></div>
      </div>
    </div>
  );
};
export default NavbarGames;
