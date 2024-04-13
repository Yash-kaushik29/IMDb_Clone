"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://movies-api14.p.rapidapi.com/home";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "9b823f5998msh3737468a61ba3d2p1118fdjsn22ec74e93ec3",
          "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMovies(result[0].movies);
        console.log(movies[12].genres);
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
