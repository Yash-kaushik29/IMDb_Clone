import React from "react";

const Loader = () => {
  return (
    <>
      <div class="flex justify-center items-center h-screen">
        <div class="relative">
          <div class="h-20 w-20 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div class="absolute top-0 left-0 h-20 w-20 rounded-full border-t-8 border-b-8 border-amber-500 dark:border-pink-700 animate-spin"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
