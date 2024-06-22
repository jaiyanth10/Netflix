import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function Trailer() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;
  const [vID, setvID] = useState("");
  const TmbdAPIkey = import.meta.env.VITE_TMDB_API_KEY;

  const linkID = id.toString();

  async function fetchData() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${linkID}/videos?api_key=${TmbdAPIkey}&language=en-US`
      );
      if (!response.ok) {
        throw new Error("Can't fetch data");
      } else {
        const resdata = await response.json();
        const trailer = resdata.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setvID(trailer.key);
        } else {
          console.log("No trailer found");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative w-full h-screen bg-black text-white flex items-center justify-center pt-20">
      <div className="w-full h-full flex items-center justify-center p-4 pb-20">
        {vID ? (
          <iframe
            className="w-full h-full max-w-full max-h-full aspect-video"
            src={`https://www.youtube.com/embed/${vID}?autoplay=1&mute=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        ) : (
          <p className="text-center">Loading trailer...</p>
        )}
      </div>
      <button
        onClick={() => navigate(-1)}
        className="absolute bottom-4 right-4 flex items-center space-x-2 text-white bg-gray-800 p-2 rounded hover:bg-gray-700 transition"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>
    </div>
  );
}
