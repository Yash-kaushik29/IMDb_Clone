import Image from "next/image";
import Link from "next/link";
import React from "react";

const Suggestions = ({ movie }) => {
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg hover:shadow-2xl dark:bg-gray-800">
        <Image
          className="w-full"
          src={movie?.poster_path}
          alt="Thumbnail"
          width={200}
          height={200}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-amber-500 dark:text-pink-700 text-xl mb-2 text-center">
            {movie?.title}
          </div>
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

export default Suggestions;
