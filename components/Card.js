import Image from "next/image";
import React, { useEffect } from "react";

const Card = ({ movie }) => {
  useEffect(() => {
    console.log(movie.genres);
  });
  return (
    <>
      <div class="rounded overflow-hidden shadow-lg hover:shadow-2xl dark:bg-gray-800">
        <Image
          class="w-full"
          src={movie.backdrop_path}
          alt="Mountain"
          width={200}
          height={200}
        />
        <div class="px-6 py-4">
          <div class="font-bold text-amber-500 dark:text-pink-700 text-xl mb-2">
            {movie.original_title}
          </div>
          <p class="dark:text-white text-base">
            {movie.overview.substr(0, 100)}...
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          {movie.genres &&
            movie.genres.map((genre) => (
              <div
                key={movie._id}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                #{genre}
              </div>
            ))}
        </div>
        <div className="flex justify-center mx-auto bg-amber-500 dark:bg-pink-700 w-[40%] py-2 rounded-3xl text-white font-semibold my-2">See More</div>
      </div>
    </>
  );
};

export default Card;
