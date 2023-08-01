import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.scss'
import Navbar from "./Components/Navbar.tsx"
import Home from "./pages/home/Home.tsx"
import GameInformation from "./pages/gameDetails/GameDetails.tsx"
function App() {
  return (
    <Router>
      <div className="App">
      <Navbar/>
      <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/game/:id" element={< GameInformation />} />
        </Routes>
        </div>
    </Router>
  )
}
export default App
