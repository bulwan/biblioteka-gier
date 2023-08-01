import "../Components/Navbar.scss";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__title">
        <NavLink to="/home" className="title__navlink">
        GAMER
          <br />
          QUEST
        </NavLink>
      </div>
      <div className="navbar__searchBar">
        <input type="search" placeholder="Search Your Specific Game..."></input>
      </div>
      <div className="navbar__buttons">
        <button className="navbar__login">Log in</button>
        <button className="navbar__register">Register</button>
      </div>
    </div>
  );
};
export default Navbar;
