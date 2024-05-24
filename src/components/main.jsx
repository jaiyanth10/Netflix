import { useEffect, useState } from "react";
export default function Main() {
  const [movies, setMovies] = useState([1, 2]);
  useEffect(() => {
    function getMovieData() {
      fetch("https://api.themoviedb.org/3/movie/popular", {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjBkZDUxMWZmMDZkYTZiYmM2OGQwYzNhMWU4MGIxMSIsInN1YiI6IjYxZjIzYmRkZDdjZDA2MDBkOTIwNmUzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOIrz1OmCS-fZIYTznSBLmXVwt2KnbiyDUj1eWhi5aU",
        },
      })
        .then((response) => response.json())
        .then((response) => setMovies(response.results))
        .catch((err) => alert(err && "cant Fetch Data"));
    }
    getMovieData();
  }, []);

  const movie = movies[Math.floor(Math.random() * 20)]; //generate random by getting array indes from nultiplyiong random into length of array.(random will always be less than 1 like,0.654)
  // function for shortening description and adding ...
  function shorten(str, Req_length) {
    if (str && str.length > Req_length) {
      return str.slice(0, Req_length - 3) + "......";
    } else {
      return str;
    }
  }  
 //console.log(movies);
  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />

        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[70%] 1g:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {shorten(movie?.overview,250)}
          </p>
        </div>
      </div>
    </div>
  );
}
