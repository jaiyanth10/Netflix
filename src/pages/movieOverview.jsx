import { useLocation } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaPlay, FaList, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MovieOverview() {
  const location = useLocation();
  const { item } = location.state || {};
  const navigate = useNavigate();

  // Function to shorten the description and add "..."
  function shorten(str, reqLength) {
    if (str && str.length > reqLength) {
      return str.slice(0, reqLength) + "...";
    } else {
      return str;
    }
  }

  function sendURLID(id) {
    navigate("/overview/trailer", {state:{id:id}});//using state u can data using routes and u need to send it as object
  }

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-auto">
      {/* Background Image with Overlay */}
      <div className="absolute w-full h-full">
        <img
          className="w-full h-full object-cover opacity-40"
          src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
          alt={item?.title}
        />
      </div>

      {/* Content Container */}
      <div className="absolute top-1/4 left-5 md:left-10 w-11/12 md:w-5/12 space-y-4">
        {/* Movie Title */}
        <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4">
          {item?.title}
        </h2>

        {/* Movie Overview */}
        <p className="mb-6 text-s md:text-m lg:text-base xl:text-lg">
          {shorten(item?.overview, 170)}
        </p>

        {/* Action Buttons Row */}
        <div className="flex items-center space-x-4 mb-8 ml-3">
          {/* Like Button */}
          <button className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-transparent md:ml-0">
            <FaThumbsUp className="h-5 w-5 text-white" />
          </button>

          {/* Dislike Button */}
          <button className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-transparent">
            <FaThumbsDown className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Play Button */}
        <div className="mb-4 ">
          <button className="flex  w-52 items-center px-5 py-2  bg-white text-black rounded-md">
            <FaPlay className="h-5 w-5 mr-2" />
            Play
          </button>
        </div>

        {/* Play Trailer Button */}
        <div className="mb-4">
          <button className="flex items-center px-5 py-2 text-white rounded-full" onClick={()=>sendURLID(item?.id)}>
            <FaPlay className="h-5 w-5 mr-2" />
            Play Trailer
          </button>
        </div>

        {/* More Like This */}
        <div className="mb-4">
          <button className="flex items-center px-5 py-2 text-white rounded-full">
            <FaList className="h-5 w-5 mr-2 " />
            More Like This
          </button>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="absolute bottom-4 right-4 flex items-center space-x-2 text-white bg-gray-800 p-2 rounded hover:bg-gray-700 transition"
      >
        <FaArrowLeft/>
        <span>Back</span>
      </button>
    </div>
  );
}
