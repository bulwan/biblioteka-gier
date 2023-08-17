import { useNavigate, NavLink, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserProfile from "../pages/userProfile/UserProfile";
import "./Navbar.css";
import "../index.css";
import CollectionDetail from "./CollectionsDetails";
import GameInformation from "./GameInformation";
import NavbarGames from "./NavbarGames";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API_KEY } from "../.././key.tsx";
import Loading from "../components/Loading.tsx"
import StatusDetails from "./StatusDetials";
function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  const [input, updateInput] = useState("");
  const [games, setGames] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  let navbarRef: any = useRef<any>(null);
  const fetchGames = async () => {
    if (input.length >= 3) {
      setIsFetching(true);
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(
            input
          )}`
        );
        setGames(response.data.results.slice(0, 6));
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    } else {
      setGames([]);
    }
  };

  useEffect(() => {
    if (input.length >= 3) {
      const timeout = setTimeout(fetchGames, 500);
      return () => clearTimeout(timeout);
    }
  }, [input]);

  useEffect(() => {
    const handler = (e: any) => {
      if (!navbarRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const changeInput = (event: any) => {
    updateInput(event.target.value);
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar__title">
          <NavLink to="/" className="title__navlink">
            Gamer Quest
          </NavLink>
        </div>

        <div
          className="navbar__searchBar"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <input
            type="search"
            placeholder="Search Your Specific Game..."
            onChange={changeInput}
          ></input>
        </div>
        <div
          className={`navbar_results ${open ? "active" : "inactive"}`}
          ref={navbarRef}
        >
          {isFetching && <p>Loading...</p>}
          {games.length > 0 && games.map((game) => (
            <Link
              to={`/game/${game.id}`}
              key={game.id}
              state={{ game: game }}
              className="results__link"
              onClick={() => setOpen(false)}
            >
              <NavbarGames
                id={game.id}
                title={game.name}
                image={game.background_image}
                rating={game.metacritic}
                platforms={game.platforms && game.platforms.map((platform: any) => platform.platform.name).join(", ")}
              />
            </Link>
          ))}
        </div>
        <div className="navbar__buttons">
          {!localStorage.getItem("token") ? (
            <>
              <NavLink to="login" className="navbar__login">
                Login{" "}
              </NavLink>
              <NavLink to="register" className="navbar__login">
                Register{" "}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="me" className="navbar__login">
                My profile{" "}
              </NavLink>
              <NavLink to="/" onClick={logout} className="navbar__login">
                Logout{" "}
              </NavLink>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="login" element={<Login src={"alanwake2.jpg"} />} />
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register src={"prey.jpg"} />} />
        <Route path="me" element={<UserProfile />} />
        <Route path="/customCollection/:id" element={<CollectionDetail />} />
        <Route path="/game/:id" element={<GameInformation />} />
        <Route path="/collection/:username/:name" element={<StatusDetails />} />
      </Routes>
    </>
  );
}
export default Navbar;
