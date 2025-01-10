import { Link } from "react-router-dom";
import './FirstContent.css';

function TopContent() {
    return (
        <div className="first-content">
            <h2 className="first-content-h2">Delicious deliveries</h2>
            <p className="first-content-p">Explore flavors at your doorstep</p>
            <Link to={'/restaurants'}>
                <button className="first-content-button">Order Now</button>
            </Link>
            <Link to={'/how-it-works'}>
                <button className="first-content-button">Our Services</button>
            </Link>
        </div>
    );
}

export default TopContent;