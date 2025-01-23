import React from "react";
const LandingPage = ({ onExplore }) => {
  return (
    <div className="landing-page">
      <h1>Welcome to Movie Recommendations</h1>
      <p>Discover your next favorite movie!</p>
      <button onClick={onExplore}>Explore Now</button>
    </div>
  );
};
export default LandingPage;
