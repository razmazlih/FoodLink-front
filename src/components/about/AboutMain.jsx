import React from 'react';
import './AboutMain.css';

function AboutMain() {
    return (
        <div className="about-container">
            <h1 className="about-title">About</h1>
            <p className="about-text">
                I developed an online food ordering website using Django and
                FastAPI, integrating WebSocket in FastAPI for real-time updates
                on delivery status. The website includes three server-side
                services: user management, restaurant management, and order
                management. The primary goal of the website was to experiment
                with complex development involving multiple servers. Key
                features of the site include user registration and login,
                viewing restaurant menus and the list of restaurants, tracking
                multiple orders simultaneously, and monitoring order status
                after payment (simulated payment). I worked on the project alone
                to learn and experiment with all aspects of development. I used
                three PostgreSQL databases and didn’t integrate any external
                tools. I designed the website independently. The biggest
                challenge was aggregating data from multiple servers and
                presenting it as coherent information on the client side. The
                website is for personal use and learning, so it is not active.
            </p>
        </div>
    );
}

export default AboutMain;