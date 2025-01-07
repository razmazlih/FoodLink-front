import { Link } from "react-router-dom";
import './FirstContent.css';

function TopContent() {
    return (
        <div className="first-content">
            <h2>Delicious deliveries</h2>
            <p>Explore flavors at your doorstep</p>
            <Link to={'/restaurants'}>
                <button>Order Now</button>
            </Link>
            <Link to={'/how-it-works'}>
                <button>Our Services</button>
            </Link>
        </div>
    );
}

export default TopContent;