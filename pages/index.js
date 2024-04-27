"use client";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useRouter } from "next/router";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Trending Movies");
  const router = useRouter();

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

        const data = res.filter((d) => d.title.includes(selectedCategory));
        setMovies(data[0].movies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleSubmit = () => {
    if (searchTerm !== "") {
      router.push(`/search/${searchTerm}`);
    }
  };

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
          <div className="flex flex-col md:flex-row justify-center sm:justify-between items-center sm:text-lg mx-auto mt-8 max-w-3xl lg:max-w-5xl py-1">
            <div className="flex items-center border-b border-teal-500 ml-5 mb-4 md:mb-0">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 px-2 leading-tight focus:outline-none dark:text-white"
                type="text"
                name={searchTerm}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies, shows"
                aria-label="Full name"
              />
              <MdSearch
                className="mr-1 font-bold text-amber-500 dark:text-pink-700 cursor-pointer sm:text-2xl"
                onClick={handleSubmit}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between space-y-1 sm:space-x-8 md:mr-5 mt-1">
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
                  selectedCategory === "New Shows"
                    ? "underline text-amber-500 dark:text-pink-700"
                    : "no-underline text-gray-600 dark:text-white"
                }`}
                onClick={() => setSelectedCategory("New Shows")}
              >
                Latest Shows
              </span>
            </div>
          </div>
          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {movies?.map((movie, i) => (
              <Card key={i} movie={movie} />
            ))}
          </div>
        </>
      </main>
    </>
  );
}
