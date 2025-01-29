import React from "react";
import { FaStar } from "react-icons/fa";
import "./MovieCard.css";

const MovieCard = ({ movie, userRatings, setUserRatings }) => {
  const handleRating = (rating) => {
    setUserRatings((prevRatings) => ({
      ...prevRatings,
      [movie.id]: rating,
    }));
    localStorage.setItem("userRatings", JSON.stringify({ ...userRatings, [movie.id]: rating }));
  };

  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.release_date}</p>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={userRatings[movie.id] >= star ? "active" : ""}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
