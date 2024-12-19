import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMain from "./components/home/HomeMain";
import Navbar from "./components/Navbar";
import RestaurantsMain from "./components/restaurants/RestaurantsMain";
import MenuMain from "./components/menu/MenuMain";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomeMain />} />
                <Route path="/restaurants" element={<RestaurantsMain />} />
                <Route path="/restaurants/:restaurantId" element={<MenuMain  />} />
            </Routes>
        </Router>
    );
}

export default App;