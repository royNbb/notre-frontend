import Link from "next/link";
import { FC } from "react";

const Hero: FC = () => {
  return (
    <div className="col-span-3 md:col-span-6 lg:col-span-12 h-full overflow-hidden">
      <div
        className='flex absolute -z-10 -top-[32rem] start-1/2 transform -translate-x-1/2'
      >
        <div className='bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]'></div>
        <div className='bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem]'></div>
      </div>
      <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 md:pb-28'>
        <div className='mt-16 max-w-xl text-center mx-auto'>
          <h1 className='block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl'>
            Connecting Curious Minds
          </h1>
        </div>

        <div className='mt-5 max-w-3xl text-center mx-auto'>
          <p className='text-lg text-gray-600'>
            JawabanKu is Your Ultimate Hub for Collaborative Learning and
            Resource Sharing.
          </p>
        </div>

        <div className='mt-8 gap-3 flex justify-center'>
          <Link
            href='/resources'
            className='inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4'
          >
            Explore Resources
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
