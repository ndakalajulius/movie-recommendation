import React from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const MovieList = ({ movies, userRatings, setUserRatings }) => {
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} userRatings={userRatings} setUserRatings={setUserRatings} />
        ))
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default MovieList;
