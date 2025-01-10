import "./HowItWorksMain.css";

function HowItWorksMain() {
  return (
    <div className="how-it-works-container">
      <h1 className="how-it-works-title">How it Works</h1>
      <div className="how-it-works-content">
        <p className="intro-text">
          Welcome to my food ordering platform! Here’s a quick overview of how
          everything works behind the scenes to ensure a smooth experience:
        </p>
        <ol className="how-it-works-steps">
          <li className="step-item">
            <strong>User Management:</strong> Create an account or log in to
            access all features. Your account securely stores your preferences
            and order history for a personalized experience.
          </li>
          <li className="step-item">
            <strong>Restaurant Management:</strong> Browse through a curated
            list of restaurants. View detailed menus with prices and
            descriptions to find exactly what you’re craving.
          </li>
          <li className="step-item">
            <strong>Order Management:</strong> Add items to your cart from one
            or multiple restaurants. Keep track of all your ongoing orders
            simultaneously. After confirming your order, track its status
            in real-time until completion.
          </li>
          <li className="step-item">
            <strong>Real-Time Updates:</strong> Using WebSocket technology, we
            provide live updates on your delivery status, so you always know
            when your food will arrive.
          </li>
          <li className="step-item">
            <strong>Simplified Payments:</strong> The platform includes a
            simulated payment system to finalize your orders securely and
            efficiently.
          </li>
          <li className="step-item">
            <strong>Built for Learning:</strong> This project was developed to
            explore multi-server architectures, real-time systems, and database
            management. While it’s fully functional, the platform is currently
            for educational purposes and not active for public use.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default HowItWorksMain;