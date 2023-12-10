import Link from "next/link";
import { Categories, CategoriesByLetter } from "@/app/interfaces/category";
import { FaExclamationTriangle } from "react-icons/fa";

async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/api/v1/category/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function MaterialDetails() {
  try {
    const data: Categories = await getData();

    return (
      <>
        <div className='max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto'>
          <div className='max-w-2xl'>
            <div className='flex justify-between items-center mb-6'>
              <div className='flex w-full sm:items-center gap-x-5 sm:gap-x-3'>
                <div className='grow'>
                  <div className='flex justify-between items-center gap-x-2'>
                    <div>
                      <div className='hs-tooltip inline-block [--trigger:hover] [--placement:bottom]'>
                        <div className='hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer'>
                          <span className='font-semibold text-gray-800 dark:text-gray-200'>
                            Leyla Ludic
                          </span>
                        </div>
                      </div>

                      <ul className='text-xs text-gray-500'>
                        <li className='inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full'>
                          Jan 18
                        </li>
                        <li className='inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full'>
                          8 min read
                        </li>
                      </ul>
                    </div>

                    <button
                      type='button'
                      className='py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none'
                    >
                      <FaExclamationTriangle style={{ color: "red" }} size={16}/>
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-5 md:space-y-8'>
              <div className='space-y-3'>
                <h2 className='text-2xl font-bold md:text-3xl dark:text-white'>
                  Announcing a free plan for small teams
                </h2>

                <p className='text-lg text-gray-800 dark:text-gray-200'>
                  At preline, our mission has always been focused on bringing
                  openness and transparency to the design process. We've always
                  believed that by providing a space where designers can share
                  ongoing work not only empowers them to make better products,
                  it also helps them grow.
                </p>
              </div>

            </div>
          </div>
        </div>

        <div className='sticky bottom-6 inset-x-0 text-center'>
          <div className='inline-block bg-white shadow-md rounded-full py-3 px-4 dark:bg-gray-800'>
            <div className='flex items-center gap-x-1.5'>
              <div className='hs-tooltip inline-block'>
                <button
                  type='button'
                  className='hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                >
                  <svg
                    className='flex-shrink-0 w-4 h-4'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  >
                    <path d='m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z' />
                  </svg>
                  16
                  <span
                    className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-black'
                    role='tooltip'
                  >
                    Comment
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return (
      <div className='col-span-3 md:col-span-6 lg:col-span-12 flex flex-col items-center gap-4'>
        <div className='py-10 lg:pt-32 flex flex-col items-center gap-4'>
          <h2 className='text-center text-gray-300 text-5xl md:text-7xl font-extrabold'>
            Shoot!
          </h2>
          <h2 className='text-center text-gray-600 text-lg'>
            Something bad hapenned. Please try again later.
          </h2>
        </div>
      </div>
    );
  }
}
