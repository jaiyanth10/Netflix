import React, { useState, useEffect } from "react";
import { OpenAI } from "openai";
import { UserAuth } from "../context/AuthContext";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";
import AIROW from "../components/AI_row.jsx";

const AI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tmdbMovies, setTmdbMovies] = useState([]);
  const { user } = UserAuth();

  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  async function GetOpenAIInstance() {
    try {
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });
      return openai;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create OpenAI instance");
    }
  }

  const searchTMDBMovie = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${movie}&include_adult=false&language=en-US&page=1`
      );
      if (!response.ok) {
        throw new Error("Can't fetch data");
      }
      const json = await response.json();
      // Extract unique movie titles
      const uniqueMovies = Array.from(
        new Map(
          json.results.map((movie) => [`${movie.title}-${movie.id}`, movie])
        ).values()
      ).slice(0, 5);
      // Limit to 5 unique movies
      // Save movies to state and Firebase
      setTmdbMovies((prev) => {
        const newMovies = [...prev, ...uniqueMovies];
        updateFirebaseMovies(newMovies);
        return newMovies;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateFirebaseMovies = async (movies) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.email);
      await updateDoc(userDocRef, {
        aiPicks: movies,
      });
    } catch (error) {
      console.error("Error updating Firebase: ", error);
    }
  };

  async function handleSearch(e) {
    e.preventDefault();
    const openai = await GetOpenAIInstance();
    const gptquery =
      "Act as a movie recommendation system and suggest some movies for the query " +
      searchTerm +
      ". Only give me the name of five movies, comma separated like the example result given ahead. Example result: Gadar 2, Don, Jawan, Hi nanna, The Batman.";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptquery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices || gptResults.choices.length === 0) {
      return (
        <div className="w-1/2 bg-slate-900 text-white text-2xl p-4">
          Hey peep, looks like the Open AI API limit is exceeded
        </div>
      );
    }

    const gptMovies = gptResults.choices[0].message.content.split(",");
    setTmdbMovies([]); // Clear previous results
    gptMovies.forEach((movie) => {
      searchTMDBMovie(movie.trim());
      console.log(movie);
    });
  }

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        doc(db, "users", user.email),
        (doc) => {
          if (doc.exists()) {
            setTmdbMovies(doc.data().aiPicks || []);
          }
        },
        (error) => {
          console.error("Error fetching data from Firebase: ", error);
        }
      );
      return () => unsubscribe();
    }
  }, []); // Empty dependency array ensures this runs on initial render

  return (
    <>
      <div className="mt-24 flex justify-center">
        <form
          onSubmit={handleSearch}
          className="w-full max-w-[85vw] md:max-w-[70vw] m-auto mt-5px"
        >
          <div className="flex flex-row">
            <input
              type="text"
              className="mt-7 w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-xs"
              placeholder="Ask movie suggestion in 6 words.."
              required
              maxLength={80}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="h-full px-4 text-white focus:outline-none"
            >
              <svg
                className="text-white h-6 w-6 fill-current mt-9"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
              >
                <path
                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
                  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
                  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17
                  s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <br />
      <AIROW rowID={5} title="Some AI Picks" mov={tmdbMovies} />
    </>
  );
};

export default AI;
