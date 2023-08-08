import { useNavigate, NavLink, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserProfile from "../pages/userProfile/UserProfile";
import "./Navbar.css";
import "../index.css";
import CollectionDetail from "./CollectionsDetails";
import GameInformation from "./GameInformation";
import Examples from "../pages/home/examples";
import NavbarGames from "./NavbarGames";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import StatusDetails from "./StatusDetials";

function Navbar() {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.removeItem("token");
		navigate("/");
		window.location.reload();
	};
	const [input, updateInput] = useState("");
	const [matchGame, updateGame] = useState<any[]>([]);
	useEffect(() => {
		const time = setTimeout(() => {
			const filteredGames = findGame();
			updateGame(filteredGames);
		}, 500);
		return () => clearTimeout(time);
	});
	const changeInput = (event: any) => {
		updateInput(event.target.value);
	};
	const findGame = () => {
		if (input.length >= 3) {
			return Examples.filter(game => {
				return game.title.toLowerCase().includes(input.toLowerCase());
			});
		} else {
			return [];
		}
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
						onChange={changeInput}
					></input>
				</div>
				<div className="navbar_results">
					{matchGame.map(game => (
						<NavbarGames
							key={game.key}
							title={game.title}
							image={game.image}
							rating={game.rating}
							platforms={game.platforms}
						/>
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
							<NavLink
								to="/"
								onClick={logout}
								className="navbar__login"
							>
								Logout{" "}
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
				<Route
					path="/customCollection/:id"
					element={<CollectionDetail />}
				/>
				<Route path="/game/:id" element={<GameInformation />} />
				<Route
					path="/collection/:username/:name"
					element={<StatusDetails />}
				/>
			</Routes>
		</>
	);
}

export default Navbar;
