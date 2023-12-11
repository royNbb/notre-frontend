import Link from "next/link";
import { FC } from "react";

const Hero: FC = () => {
  return (
    <div className="col-span-3 md:col-span-6 lg:col-span-12 h-full overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/component/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/component/squared-bg-element-dark.svg')]">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 md:pb-28">
        <div className="mt-16 max-w-xl text-center mx-auto">
          <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
            Connecting Curious Minds
          </h1>
        </div>

        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            JawabanKu is Your Ultimate Hub for Collaborative Learning and
            Resource Sharing.
          </p>
        </div>

        <div className="mt-8 gap-3 flex flex-col items-center justify-center">
          <Link
            href="/resources"
            className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800"
          >
            Explore Resources
          </Link>
          <Link
            href="/resources/upload"
            className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800"
          >
            Share a Resource
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
