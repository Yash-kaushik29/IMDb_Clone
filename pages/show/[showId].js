import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import EpisodeCard from "@/components/EpisodeCard";

const ShowID = ({ show, seasons }) => {
  const [season, setSeason] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div
        className="flex justify-center bg-cover bg-center h-100 md:h-screen"
        style={{
          backgroundImage: `url(${show?.backdrop_path})`,
        }}
      >
        <div
          className="fixed top-3 sm:top-5 left-2 sm:left-10 text-xl sm:text-2xl cursor-pointer"
          onClick={goBack}
        >
          <IoArrowBack className="text-amber-500 dark:text-pink-700 bg-gray-100 rounded-full" />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mx-2 sm:mx-10 my-2 w-full md:w-[90%] lg:w-[70%]">
          <Image
          className="rounded-xl shadow-white shadow-sm hover:shadow-white hover:shadow-md h-[45%] w-[200px] sm:h-[50%] sm:w-[250px] md:h-[60%] md:w-[45%]"
          src={show?.poster_path}
          alt="Thumbnail"
          width={300}
          height={300}
        />
        <div className="flex flex-col px-6 items-center md:items-start text-center md:text-start">
          <div className="py-2">
            <div className="text-white font-bold mb-2">
              <div className="text-xl sm:text-3xl lg:text-4xl">
                {show?.title}
              </div>
              <div>Released on : {show?.first_aired}</div>
              <div className="flex items-center font-semibold justify-center md:justify-start">
                <FaStar className="mr-1 text-amber-500 dark:text-pink-700" />
                <div className="text-lg">
                  <span className="font-bold text-2xl text-amber-500 dark:text-pink-700">
                    {show?.vote_average?.toString().substr(0, 3)}
                  </span>
                  /10
                </div>
              </div>
            </div>
            <p className="font-semibold text-sm sm:text-base xl:text-xl text-white">
              {show?.overview}
            </p>
          </div>
          <div className="pt-1 pb-1">
            {show?.genres &&
              show.genres.map((genre, i) => (
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
            <TbBrandYoutubeFilled className="mx-2 text-3xl text-red-600 cursor-pointer" onClick={() => setShowTrailer(!showTrailer)} />
          </div>
          <div className="flex flex-wrap font-bold">
            {show?.sources?.map((source, i) => (
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
      </div>
      <div className="bg-black dark:bg-white h-[1px] mt-5 mx-5"></div>
      <div className="text-center mt-8 text-2xl font-bold"><span className="text-amber-500 dark:text-pink-700 text-3xl animate-pulse">Watch</span> All Seasons</div>
      <div className="pt-5 flex flex-wrap gap-5 justify-center">
        {seasons && seasons.map((s, i) => (
            <div key={i} className="" onClick={() => setSeason(i)}>
                <div className="bg-amber-500 dark:bg-pink-700 px-3 py-1 rounded-xl text-white shadow-lg dark:shadow-sm hover:shadow-sm shadow-gray-500 hover:shadow-gray-500 dark:shadow-white dark:hover:shadow-none cursor-pointer text-sm sm:text-base">Season {i+1}</div>
            </div> 
        ))}
      </div>

      <div>
        <div className="font-semibold text-2xl md:text-4xl my-10 text-center">Season <span>{season+1}</span></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-10">
        {seasons[season].episodes.map((episode, i) => (
          <EpisodeCard key={i} episode={episode} />
        ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const showId = context.query.showId;
  let show = [];
  let seasons = [];

  const url = `https://movies-api14.p.rapidapi.com/show/${showId}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_API_KEY,
      "X-RapidAPI-Host": "movies-api14.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    show = result.show;
    seasons = result.seasons;
  } catch (error) {
    console.error(error);
  }
  return { props: { show, seasons } };
}

export default ShowID;
