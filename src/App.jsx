import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeMain from './components/home/HomeMain';
import Navbar from './components/Navbar';
import RestaurantsMain from './components/restaurants/RestaurantsMain';
import MenuMain from './components/menu/MenuMain';
import Login from './components/users/Login';
import { AuthProvider } from './context/AuthContext';
import Register from './components/users/Register';
import AboutMain from './components/about/AboutMain';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomeMain />} />
                    <Route path="/restaurants" element={<RestaurantsMain />} />
                    <Route path="/restaurants/:restaurantId" element={<MenuMain />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<AboutMain />} />                    
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
