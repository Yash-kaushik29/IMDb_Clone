import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";

const Card = ({ movie }) => {
  const movieId = movie._id;

  return (
    <>
      <div className="rounded overflow-hidden shadow-lg hover:shadow-2xl dark:bg-gray-800">
        <Image
          className="w-full"
          src={movie?.backdrop_path}
          alt="Thumbnail"
          width={200}
          height={200}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-amber-500 dark:text-pink-700 text-xl mb-2">
            {movie?.title}
          </div>
          <p className="dark:text-white text-base">
            {movie.overview?.substr(0, 100)}...
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          {movie?.genres &&
            movie.genres.map((genre, i) => (
              <div
                key={i}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {genre}
              </div>
            ))}
        </div>
        <Link href={`/${movie.contentType}/${movieId}`}>
          <div className="flex justify-center mx-auto bg-amber-500 dark:bg-pink-700 w-[40%] py-2 rounded-3xl text-white font-semibold my-2">
            See More
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
