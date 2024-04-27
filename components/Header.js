import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode, MdHome, MdInfo } from "react-icons/md";
import Link from "next/link";

const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      id="header"
      className="bg-gray-200 dark:bg-black py-4 shadow-lg sticky top-0"
    >
      <div className="flex flex-col sm:flex-row justify-between md:mx-auto max-w-2xl lg:max-w-5xl items-center">
        <Link href="/">
          <div className="cursor-pointer mb-5 sm:mb-0 px-10">
            <span className="text-4xl text-amber-500 dark:text-pink-700 mr-1 font-bold">
              Movie
            </span>
            <span className="text-gray-700 dark:text-white font-bold">Map</span>
          </div>
        </Link>
        <div className="flex items-center space-x-8 px-10">
          <div
            className="cursor-pointer bg-amber-400 dark:bg-white rounded-full p-2"
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {loaded && theme === "dark" ? (
              <MdLightMode className="text-pink-700" />
            ) : (
              <MdDarkMode className="text-white" />
            )}
          </div>
          <Link href="/">
            <MdHome className="text-3xl text-amber-500 dark:text-pink-700 cursor-pointer" />
          </Link>
          <Link href="/about">
            <MdInfo className="text-3xl text-amber-500 dark:text-pink-700 cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
