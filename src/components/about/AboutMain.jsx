import './AboutMain.css';

function AboutMain() {
    return (
        <div className="about-container">
            <h1 className="about-title">About</h1>
            <p className="about-text">
                I developed an online food ordering website using <span className="highlight">Django</span> and
                <span className="highlight"> FastAPI</span>, integrating <span className="highlight">WebSocket</span> in FastAPI
                for real-time updates on delivery status.
            </p>
            <p className="about-text">
                The website includes three server-side services: <span className="highlight">user management</span>, 
                <span className="highlight"> restaurant management</span>, and <span className="highlight">order management</span>.
                The primary goal of the website was to experiment with complex development involving multiple servers.
            </p>
            <p className="about-text">
                Key features of the site include:
            </p>
            <ul className="features-list">
                <li>User registration and login</li>
                <li>Viewing restaurant menus and the list of restaurants</li>
                <li>Tracking multiple orders simultaneously</li>
                <li>Monitoring order status after payment (simulated payment)</li>
            </ul>
            <p className="about-text">
                I worked on the project alone to learn and experiment with all aspects of development. I used three <span className="highlight">PostgreSQL</span> databases and didn’t integrate any external tools.
            </p>
            <p className="about-text">
                I designed the website independently. The biggest challenge was aggregating data from multiple servers and presenting it as coherent information on the client side.
            </p>
            <p className="about-text">
                The website is for personal use and learning, so it is not active.
            </p>
        </div>
    );
}

export default AboutMain;