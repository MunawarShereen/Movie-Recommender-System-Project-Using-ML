import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

const TMDB_API_KEY = "2202712fdba3ed542b48ee46424588ae"; 

function App() {
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/movies')
      .then(res => setMovieList(res.data))
      .catch(err => console.error(err));
  }, []);

  const getPosterUrl = async (id) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`);
    return `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`;
  };

  const handleRecommend = async () => {
    if (!selectedMovie) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://127.0.0.1:8000/recommend/${selectedMovie}`);
      const dataWithPosters = await Promise.all(
        res.data.recommendations.map(async (movie) => ({
          ...movie,
          poster: await getPosterUrl(movie.id)
        }))
      );
      setRecommendations(dataWithPosters);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🎬 Movie Recommender</h1>
      
      <div className="search-box">
        <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
          <option value="">Choose a movie...</option>
          {movieList.map((m, i) => <option key={i} value={m.title}>{m.title}</option>)}
        </select>
        <button onClick={handleRecommend} disabled={loading}>
          {loading ? "Searching..." : "Recommend"}
        </button>
      </div>

      <div className="movie-grid">
        {recommendations.map((movie, index) => (
          <div key={index} className="movie-card">
            <img src={movie.poster} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;