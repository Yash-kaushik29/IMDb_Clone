import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useScroll, animated } from "@react-spring/web";
import { FaStar, FaArrowUp } from "react-icons/fa";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { IoArrowBack } from "react-icons/io5";
import Suggestions from "@/components/Suggestions";
import { useRouter } from "next/router";
import ReactPlayer from "react-player";

const MovieId = ({ movie, similarMovies }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const router = useRouter();
  const { scrollYProgress } = useScroll();

  const goBack = () => {
    router.back();
  };

  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div
        className="flex justify-center bg-cover bg-center h-100 md:h-screen"
        style={{
          backgroundImage: `url(${movie?.backdrop_path})`,
        }}
      >
        <div
          className="fixed top-3 sm:top-5 left-2 sm:left-10 text-xl sm:text-2xl cursor-pointer"
          onClick={goBack}
        >
          <IoArrowBack className="text-amber-500 dark:text-pink-700 bg-gray-100 rounded-full" />
        </div>
        <animated.div
          className="fixed bottom-4 sm:bottom-10 right-4 sm:right-10 text-xl sm:text-2xl animate-bounce cursor-pointer "
          style={{ opacity: scrollYProgress }}
        >
          <FaArrowUp
            className="text-amber-500 dark:text-pink-700 bg-gray-100 rounded-full"
            onClick={scrollToTop}
          />
        </animated.div>
        <div className="flex flex-col md:flex-row justify-center items-center mx-2 sm:mx-10 my-2 w-full md:w-[90%] lg:w-[70%]">
          {showTrailer === true ? (
            <div className="mt-10 mb-5">
              <ReactPlayer
                url={movie?.youtube_trailer}
                width={`70vw`}
                height={`40vw`}
                controls
              />
              <div
                className="bg-red-600 text-white px-5 py-2 rounded-xl text-sm sm:text-base mt-5 w-fit mx-auto font-semibold cursor-pointer"
                onClick={() => setShowTrailer(false)}
              >
                Close
              </div>
            </div>
          ) : (
            <>
              <Image
                className="rounded-xl shadow-white shadow-sm hover:shadow-white hover:shadow-md h-[45%] w-[200px] sm:h-[50%] sm:w-[250px] md:h-[60%] md:w-[45%]"
                src={movie?.poster_path}
                alt="Thumbnail"
                width={300}
                height={300}
              />
              <div className="flex flex-col px-6 items-center md:items-start text-center md:text-start">
                <div className="py-2">
                  <div className="text-white font-bold mb-2">
                    <div className="text-xl sm:text-3xl lg:text-4xl">
                      {movie?.title}
                    </div>
                    <div>Released on : {movie?.release_date}</div>
                    <div className="flex items-center font-semibold justify-center md:justify-start">
                      <FaStar className="mr-1 text-amber-500 dark:text-pink-700" />
                      <div className="text-lg">
                        <span className="font-bold text-2xl text-amber-500 dark:text-pink-700">
                          {movie?.vote_average?.toString().substr(0, 3)}
                        </span>
                        /10
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold text-sm sm:text-base xl:text-xl text-white">
                    {movie?.overview}
                  </p>
                </div>
                <div className="pt-1 pb-1">
                  {movie?.genres &&
                    movie.genres.map((genre, i) => (
                      <div
                        key={i}
                        className="inline-block bg-amber-400 dark:bg-pink-600 rounded-full px-3 py-1 text-sm sm:text-base font-semibold text-white mr-2 mb-2"
                      >
                        {genre}
                      </div>
                    ))}
                </div>
                <div className="flex items-center my-2 text-white font-semibold text-sm sm:text-base">
                  {" "}
                  Watch trailer on{" "}
                  <TbBrandYoutubeFilled className="mx-2 text-3xl text-red-600 cursor-pointer" onClick={() => setShowTrailer(true)}/>
                </div>
                <div className="flex space-x-2 font-bold">
                  {movie?.sources?.map((source, i) => (
                    <Link href={source?.link}>
                      <div
                        key={i}
                        className="text-white bg-amber-400 dark:bg-pink-600 w-fit px-4 py-2 rounded-full"
                      >
                        Link {i + 1}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="bg-black dark:bg-white h-[1px] mt-5 mx-5"></div>
      <div>
        <h1 className="text-center my-10 font-bold text-2xl md:text-3xl lg:text-4xl">
          <span className="text-amber-500 dark:text-pink-700 text-3xl md:text-4xl lg:text-5xl animate-pulse">
            You
          </span>{" "}
          might also like
        </h1>
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {similarMovies &&
            similarMovies.map((similarMovie, i) => (
              <Suggestions key={i} movie={similarMovie} />
            ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const movieId = context.query.movieId;
  let result = [];
  let movie = [];
  let similarMovies = [];

  const url = `https://movies-api14.p.rapidapi.com/movie/${movieId}`;
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
    movie = result.movie;
    similarMovies = result.similarMovies;
  } catch (error) {
    console.error(error);
  }
  return { props: { movie, similarMovies } };
}

export default MovieId;
