import "./App.css";
import Navbar from "./components/Navbar";
import { setAuthToken } from "./components/setAuthToken";
import { BrowserRouter } from "react-router-dom";

function App() {
	const auth = localStorage.getItem("token");
	setAuthToken(auth);
	return (
		<>
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		</>
	);
}

export default App;
