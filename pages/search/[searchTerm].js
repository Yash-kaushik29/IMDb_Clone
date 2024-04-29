import Header from "@/components/Header";
import Loader from "@/components/Loader";
import SearchFeed from "@/components/SearchFeed";
import React, { useEffect, useState } from "react";

const SearchTerm = ({ result }) => {
  const [genre, setGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    setMovies(result.contents);
    setGenre("");
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, []);

  const filterGenre = (e) => {
    const genre = e.target.value;
    if (genre !== "") {
      const updatedMovies = result.contents.filter((movie) => {
        return movie.genres.includes(genre);
      });
      setGenre(genre);
      setMovies(updatedMovies);
    } else {
      setGenre("");
      setMovies(result.contents);
    }
  };

  return (
    <>
      <Header />
      {loading ? <div className="relative bottom-[100px]"><Loader /></div> :
      <>
      <div className="flex flex-col sm:flex-row justify-around items-center">
        <div className="my-5 mx-10 font-bold text-xl text-center">
          Showing Results for :{" "}
          <span className="text-amber-500 dark:text-pink-700">
            {result.query}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-center sm:space-x-10 mx-10">
          <div>
            <form className="w-[250px] sm:w-[200px] mx-auto">
              <select
                id="genre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-700 dark:focus:border-pink-700"
                onChange={filterGenre}
              >
                <option value="" selected>
                  Choose a genre---
                </option>
                <option value="Action & Adventure">Action & Adventure</option>
                <option value="Animation">Animation</option>
                <option value="Comedy">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Documentary">Documentary</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Sci-Fi & Fantasy">Sci-Fi & Fantasy</option>
                <option value="Thriller">Thriller</option>
              </select>
            </form>
          </div>
        </div>
      </div>
      <div className="p-10 justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {movies?.map((movie, i) => (
          <SearchFeed key={i} movie={movie} genre={genre} />
        ))}
      </div>
      </>}
    </>
  );
};

export async function getServerSideProps(context) {
  const searchTerm = context.query.searchTerm;
  let result = [];

  const url = `https://movies-api14.p.rapidapi.com/search?query=${searchTerm}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
      "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    result = await response.json();
  } catch (error) {
    console.error(error);
  }
  return { props: { result } };
}

export default SearchTerm;
