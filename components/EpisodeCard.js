import Image from "next/image";
import Link from "next/link";
import React from "react";

const EpisodeCard = ({ episode }) => {
  console.log(episode);
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg hover:shadow-2xl dark:bg-gray-800">
        <Image
          className="w-full"
          src={episode?.thumbnail_path}
          alt="Thumbnail"
          width={200}
          height={200}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-amber-500 dark:text-pink-700 text-xl mb-2 text-center">
            {episode.episode_number}. {episode?.title}
          </div>
          <div className="flex flex-wrap justify-center my-1">
            {episode.sources &&
              episode.sources.map((source, i) => (
                <Link href={source?.link}>
                  <div
                    key={i}
                    className="text-white bg-amber-400 dark:bg-pink-600 w-fit px-4 py-2 rounded-full my-2 mx-1"
                  >
                    Link {i + 1}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EpisodeCard;
