import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeMain from './components/home/HomeMain';
import Navbar from './components/navbar/Navbar';
import RestaurantsMain from './components/restaurants/RestaurantsMain';
import MenuMain from './components/menu/MenuMain';
import Login from './components/users/Login';
import { AuthProvider } from './context/AuthContext';
import Register from './components/users/Register';
import AboutMain from './components/about/AboutMain';
import HowItWorksMain from './components/how-it-works/HowItWorksMain';
import { CartContextProvider } from './context/CartContext';
import Orders from './components/orders/all_orders/Orders';
import OrderCheckoutMain from './components/checkout/OrderCheckoutMain';

function App() {
    return (
        <Router>
            <AuthProvider>
                <CartContextProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomeMain />} />
                        <Route
                            path="/restaurants"
                            element={<RestaurantsMain />}
                        />
                        <Route
                            path="/restaurants/:restaurantId"
                            element={<MenuMain />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/about" element={<AboutMain />} />
                        <Route
                            path="/how-it-works"
                            element={<HowItWorksMain />}
                        />
                        <Route path="/my-orders" element={<Orders />} />
                        <Route path="/my-orders/checkout/:orderId" element={<OrderCheckoutMain />} />


                    </Routes>
                </CartContextProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
