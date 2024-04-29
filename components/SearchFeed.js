import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Loader from "./Loader";

const SearchFeed = ({ movie, genre }) => {

  return (
    <>
      <div className="rounded overflow-hidden shadow-lg hover:shadow-2xl dark:bg-gray-800">
        <Image
          className="w-full"
          src={movie?.backdrop_path}
          alt="Poster"
          width={200}
          height={200}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-amber-500 dark:text-pink-700 text-xl mb-2">
            {movie?.title}
          </div>
          <div className="flex items-center font-semibold">
            <FaStar className="mr-1 text-amber-500 dark:text-pink-700" />
            <div>
              <span className="font-bold text-xl text-amber-500 dark:text-pink-700">
                {movie?.vote_average?.toString().substr(0, 3)}
              </span>
              /10
            </div>
          </div>
          <p className="dark:text-white text-base">
            {movie.overview?.substr(0, 100)}...
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {movie?.genres &&
            movie.genres.map((g, i) => (
              <div
                key={i}
                className={`inline-block ${
                  g === genre
                    ? "bg-amber-300 dark:bg-pink-500 text-white"
                    : "bg-gray-200"
                } rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}
              >
                {g}
              </div>
            ))}
        </div>
        <Link href={`/${movie.contentType}/${movie._id}`}>
          <div className="flex justify-center mx-auto bg-amber-500 dark:bg-pink-700 w-[40%] py-2 rounded-3xl text-white font-semibold my-2">
            See More
          </div>
        </Link>
      </div>
    </>
  );
};

export default SearchFeed;
