import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Recommendations from "./components/Recommendations";
import "./App.css";

const API_KEY = "YOUR_TMDB_API_KEY";
const API_URL = "https://api.themoviedb.org/3";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRatings, setUserRatings] = useState({});

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/trending/movie/week`, {
        params: { api_key: API_KEY },
      });
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching trending movies", error);
    }
  };

  const searchMovies = async (query) => {
    if (!query) {
      fetchTrendingMovies();
      return;
    }
    try {
      const { data } = await axios.get(`${API_URL}/search/movie`, {
        params: { api_key: API_KEY, query },
      });
      setMovies(data.results);
    } catch (error) {
      console.error("Error searching movies", error);
    }
  };

  const debouncedSearch = useCallback(debounce(searchMovies, 500), []);

  const handleSearch = (query) => {
    setSearchTerm(query);
    debouncedSearch(query);
  };

  return (
    <div className="app">
      <h1>🎬 Movie Recommendation System</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <MovieList movies={movies} userRatings={userRatings} setUserRatings={setUserRatings} />
      <Recommendations userRatings={userRatings} />
    </div>
  );
};

export default App;
