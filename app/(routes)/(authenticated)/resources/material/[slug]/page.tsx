import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import { Material } from "@/app/interfaces/material";
import { getIdFromSlug } from "@/app/utils/get-id-from-slug";
import dayjs from "dayjs";
import { Button } from "@chakra-ui/react";
import { CiFileOn } from "react-icons/ci";

async function getData(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const id = getIdFromSlug(slug);

  try {
    const res = await fetch(`${baseUrl}/material/${id}/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json().then((data) => data.data);
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function MaterialDetails({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const data: Material = await getData(params.slug);

    return (
      <div className='max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto flex flex-col gap-4'>
        <div className='max-w-2xl'>
          <div className='flex justify-between items-center mb-6'>
            <div className='flex w-full sm:items-center gap-x-5 sm:gap-x-3'>
              <div className='grow'>
                <div className='flex justify-between items-center gap-x-2'>
                  <div>
                    <div className='hs-tooltip inline-block [--trigger:hover] [--placement:bottom]'>
                      <div className='hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer'>
                        <span className='font-semibold text-gray-800'>
                          {data.owner.name != ""
                            ? data.owner.name
                            : "The owner"}
                        </span>
                      </div>
                    </div>

                    <ul className='text-xs text-gray-500'>
                      <li className='inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full'>
                        {dayjs(data.createdAt * 1000).format(
                          "DD MMMM YYYY | HH:mm"
                        )}
                      </li>
                    </ul>
                  </div>

                  <button
                    type='button'
                    className='py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none'
                  >
                    <FaExclamationTriangle style={{ color: "red" }} size={16} />
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-5 md:space-y-8'>
            <div className='space-y-3'>
              <h2 className='text-2xl font-bold md:text-3xl'>
                {data.title}
              </h2>

              <p className='text-lg text-gray-800'>
                {data.description}
              </p>
            </div>
          </div>
        </div>

        <a href={data.content} target='_blank'>
          <Button
            leftIcon={<CiFileOn />}
            colorScheme='teal'
            variant='solid'
            className='w-full flex'
          >
            Download File
          </Button>
        </a>

        {data.categories.map((category) => (
          <Link
            key={category.id}
            className='max-w-max m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 '
            href={`/resources/search?category=${encodeURIComponent(
              category.name
            )}`}
          >
            {category.name}
          </Link>
        ))}

        <div className='sticky bottom-6 inset-x-0 text-center mt-16'>
          <div className='inline-block bg-white shadow-md rounded-full py-3 px-4 '>
            <div className='flex items-center gap-x-1.5'>
              <div className='hs-tooltip inline-block'>
                <button
                  type='button'
                  className='hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800'
                >
                  <svg
                    className='flex-shrink-0 w-4 h-4'
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
                    <path d='m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z' />
                  </svg>
                  16
                  <span
                    className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm'
                    role='tooltip'
                  >
                    Comment
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
