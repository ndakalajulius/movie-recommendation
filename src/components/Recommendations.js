import React from "react";
import "./Recommendations.css";

const Recommendations = ({ userRatings }) => {
  const topRated = Object.keys(userRatings)
    .filter((key) => userRatings[key] >= 4)
    .map(Number);

  return (
    <div className="recommendations">
      <h2>🎯 Recommended for You</h2>
      {topRated.length > 0 ? (
        <ul>
          {topRated.map((id) => (
            <li key={id}>Movie ID: {id} (Rated {userRatings[id]}/5)</li>
          ))}
        </ul>
      ) : (
        <p>Rate movies to get recommendations!</p>
      )}
    </div>
  );
};

export default Recommendations;
