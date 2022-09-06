import React, { useState } from "react";
import MovieTemplate from "./MovieTemplate";
import "./Style.css";



const MainPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const SearchMovies = async (e) => {
    e.preventDefault();
    console.log("submitting");

    const url = `https://api.themoviedb.org/3/search/movie?api_key=da128f0f40bdeb2660ba6801fe504117&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {console.log(err);}
  };

  return (
    <>
    <h1 className="h1">My Movie Search App</h1>
      <form className="form" onSubmit={SearchMovies} autoComplete="off">
        <label className="label" htmlFor="query"></label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="search a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button">Search</button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieTemplate movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
};

export default MainPage;
