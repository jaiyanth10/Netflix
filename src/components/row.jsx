import { useState, useEffect } from "react";
import Rowmovies from "./rowmovies";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
export default function row({ title, fetchURL , rowID }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    try {
      fetchURL().then((data) => setMovie(data?.results));
      console.log()
    } catch (error) {
      console.log(error && `cant fetch data for ${title} row`);
    }
  }, [fetchURL]);

  //To retrieve the current horizontal scroll position of an element, you can simply access its scrollLeft property. then, add needed some pixels and it will change position to new value
  const slideLeft = () => {
    var slider = document.getElementById('slider' + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider' + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl py-2 px-4">{title}</h2>
      <div className="relative flex items-center group ">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white text-black left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider"+ rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movie.reverse().map((Mov, id) => (
            <Rowmovies item = {Mov} key={id} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white text-black right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
}
