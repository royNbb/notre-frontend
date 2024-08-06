import Image from "next/image";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-end">
      <div className='relative min-w-[100%] max-w-[100%] h-48 md:h-80 mt-16'>
        <Image
          src='/footer-bg.svg'
          alt='footer background'
          fill
          priority
          className='object-cover select-none pointer-events-none'
        />
      </div>
      <footer className='w-full bg-violet-950 pb-10 px-4 sm:px-6 lg:px-8 mx-auto z-50'>
        <div className='text-center'>
          <div>
            <a
              className='flex-none text-xl font-semibold text-white focus:outline-none focus:ring-1 focus:ring-gray-600'
              href='#'
              aria-label='Brand'
            >
              Notre
            </a>
          </div>

          <div className='mt-3'>
            <p className='text-gray-100'>
            © 2024 Notre. Dedicated to bringing equal learning opportunities for all.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
