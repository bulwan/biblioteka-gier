import { useNavigate, NavLink, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserProfile from "../pages/userProfile/UserProfile";
import "./Navbar.css";
import "../index.css";
import CollectionDetail from "./CollectionsDetails";
import GameInformation from "./GameInformation";

function Navbar() {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("token");
		navigate("/");
		window.location.reload();
	};
	return (
		<>
			<nav className="navbar">
				<div className="navbar__title">
					<NavLink to="/" className="title__navlink">
						Gamer Quest
					</NavLink>
				</div>

				<div className="navbar__searchBar">
					<input
						type="search"
						placeholder="Search Your Specific Game..."
					></input>
				</div>
				<div className="navbar__buttons">
					{localStorage.getItem("token") ? (
						<>
							<NavLink to="me" className="navbar__login">
								My profile{" "}
							</NavLink>
							<NavLink
								to="/"
								onClick={logout}
								className="navbar__login"
							>
								Logout{" "}
							</NavLink>
						</>
					) : (
						<>
							<NavLink to="login" className="navbar__login">
								Login{" "}
							</NavLink>
							<NavLink to="register" className="navbar__login">
								Register{" "}
							</NavLink>
						</>
					)}
				</div>
			</nav>
			<Routes>
				<Route path="login" element={<Login src={"alanwake2.jpg"} />} />
				<Route path="/" element={<Home />} />
				<Route
					path="register"
					element={<Register src={"prey.jpg"} />}
				/>
				<Route path="me" element={<UserProfile />} />
				<Route path="/collection/:id" element={<CollectionDetail />} />
				<Route path="/game/:id" element={<GameInformation />} />
			</Routes>
		</>
	);
}

export default Navbar;
