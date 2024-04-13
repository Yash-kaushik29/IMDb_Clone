"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Trending Movies");

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://movies-api14.p.rapidapi.com/home";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
          "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const res = await response.json();
        
        setMovies(res[0].movies);
        console.log(movies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>IMDB Clone</title>
        <meta name="description" content="Created by Yash" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <>
          <Header />
          <div className="flex flex-col md:flex-row justify-center sm:justify-between items-center mx-auto my-4 max-w-2xl lg:max-w-5xl">
            <div className="flex items-center border-b border-teal-500 ml-5 mb-4 md:mb-0">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Search movies, shows"
                aria-label="Full name"
              />
              <MdSearch className="mt-[6px] mr-1 font-bold text-amber-500 dark:text-pink-700" />
            </div>
            <div className="flex items-center justify-between space-x-4 sm:space-x-6 mr-5">
              <span
                className={`font-semibold hover:text-amber-500 dark:hover:text-pink-700 cursor-pointer ${
                  selectedCategory === "Trending Movies"
                    ? "underline text-amber-500 dark:text-pink-700"
                    : "no-underline text-gray-600 dark:text-white"
                }`}
                onClick={() => setSelectedCategory("Trending Movies")}
              >
                Trending Movies
              </span>
              <span
                className={`font-semibold hover:text-amber-500 dark:hover:text-pink-700 cursor-pointer ${
                  selectedCategory === "Trending Shows"
                    ? "underline text-amber-500 dark:text-pink-700"
                    : "no-underline text-gray-600 dark:text-white"
                }`}
                onClick={() => setSelectedCategory("Trending Shows")}
              >
                Trending Shows
              </span>
              <span
                className={`font-semibold hover:text-amber-500 dark:hover:text-pink-700 cursor-pointer ${
                  selectedCategory === "Sci Fi"
                    ? "underline text-amber-500 dark:text-pink-700"
                    : "no-underline text-gray-600 dark:text-white"
                }`}
                onClick={() => setSelectedCategory("Sci Fi")}
              >
                Sci Fi
              </span>
            </div>
          </div>
          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {movies.map((movie) => (
              <Card key={movie._id} movie={movie} />
            ))}
          </div>
        </>
      </main>
    </>
  );
}
