import React, { useState, useEffect } from "react";

import axios from 'axios';
import './App.css'
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import NavBar from "./NavBar";
import LandingPage from "./LandingPage";
import ContactPage from "./ContactPage";

const API_KEY = "YOUR_TMDB_API_KEY_HERE"; // Replace with your TMDB API Key
const BASE_URL = "https://api.themoviedb.org/3";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState("landing");
  // Fetch trending movies on load
  useEffect(() => {
    if (!user) return;

    const fetchTrendingMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
          params: { api_key: API_KEY },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingMovies();
  }, [user]);// Fetch movie recommendations
  const fetchRecommendations = async (movieId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations`, {
        params: { api_key: API_KEY },
      });
      setRecommendations(response.data.results);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch detailed information about a movie
  const fetchMovieDetails = async (movieId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: { api_key: API_KEY },
      });
      setSelectedMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Search for movies
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, query: searchTerm },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error searching for movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setMovies([]);
    setRecommendations([]);
    setSelectedMovie(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onExplore={() => setCurrentPage("movies")} />;
      case "movies":
        return (
          <>
            <header className="app-header">
              <h1>Movie Recommendation System</h1>
              <button onClick={handleLogout} className="logout-button">Logout</button>
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search for a movie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">Search</button>
              </form>
            </header>

            {loading && <p>Loading...</p>}

            <main>
              <section className="movie-list">
                <h2>Trending Movies</h2>
                <div className="movies">
                  {movies.map((movie) => (
                    <div
                      key={movie.id}
                      className="movie-card"
                      onClick={() => {
                        fetchRecommendations(movie.id);
                        fetchMovieDetails(movie.id);
                      }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                      <h3>{movie.title}</h3>
                    </div>
                  ))}
                </div>
              </section>

              {selectedMovie && (
                <section className="movie-details">
                  <h2>{selectedMovie.title}</h2>
                  <p>{selectedMovie.overview}</p>
                  <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                  <p><strong>Rating:</strong> {selectedMovie.vote_average} / 10</p>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                    className="movie-poster"
                  />
                </section>
              )}

              {recommendations.length > 0 && (
                <section className="recommendation-list">
                  <h2>Recommended Movies</h2>
                  <div className="movies">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="movie-card">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                          alt={rec.title}
                        />
                        <h3>{rec.title}</h3>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </main>
          </>
        );
      case "contact":
        return <ContactPage />;
      default:
        return <LandingPage onExplore={() => setCurrentPage("movies")} />;
    }
  };

  if (!user) {
    return isLogin ? (
      <LoginForm onLogin={handleLogin} onSwitch={() => setIsLogin(false)} />
    ) : (
      <SignUpForm onSignUp={handleLogin} onSwitch={() => setIsLogin(true)} />
    );
  }

  return (
    <div className="app">
      <NavBar onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
};

export default App;