import { FC } from "react";

const Features: FC = () => {
  return (
    <div className='col-span-3 md:col-span-6 lg:col-span-12 mt-20 max-w-4xl mx-auto'>
      <div className='flex flex-wrap justify-between gap-8 lg:gap-16'>
        <div className='flex max-w-xs lg:max-w-sm mx-auto'>
          <svg
            className='flex-shrink-0 mt-2 h-8 w-8 text-gray-800 dark:text-white'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m7.5 4.27 9 5.15' />
            <path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' />
            <path d='m3.3 7 8.7 5 8.7-5' />
            <path d='M12 22V12' />
          </svg>
          <div className='ms-5 sm:ms-8'>
            <h3 className='text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200'>
              Categorized
            </h3>
            <p className='mt-1 text-gray-600 dark:text-gray-400'>
              Easily find what you're looking for with our organized learning
              materials
            </p>
          </div>
        </div>

        <div className='flex max-w-xs lg:max-w-sm mx-auto'>
          <svg
            className='flex-shrink-0 mt-2 h-8 w-8 text-gray-800 dark:text-white'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
          </svg>
          <div className='ms-5 sm:ms-8'>
            <h3 className='text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200'>
              Blazing fast
            </h3>
            <p className='mt-1 text-gray-600 dark:text-gray-400'>
              Enjoy a snappy learning experience and easy access to a world of
              knowledge
            </p>
          </div>
        </div>

        <div className='flex max-w-xs lg:max-w-sm mx-auto'>
          <svg
            className='flex-shrink-0 mt-2 h-8 w-8 text-gray-800 dark:text-white'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
            <circle cx='9' cy='7' r='4' />
            <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
            <path d='M16 3.13a4 4 0 0 1 0 7.75' />
          </svg>
          <div className='ms-5 sm:ms-8'>
            <h3 className='text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200'>
              By students, for students
            </h3>
            <p className='mt-1 text-gray-600 dark:text-gray-400'>
              Find and share resources made by students.
            </p>
          </div>
        </div>

        <div className='flex max-w-xs lg:max-w-sm mx-auto'>
          <svg
            className='flex-shrink-0 mt-2 h-8 w-8 text-gray-800 dark:text-white'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M7 10v12' />
            <path d='M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z' />
          </svg>
          <div className='ms-5 sm:ms-8'>
            <h3 className='text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200'>
              Great resources
            </h3>
            <p className='mt-1 text-gray-600 dark:text-gray-400'>
              Access high-quality learning materials to enhance your academic
              journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
