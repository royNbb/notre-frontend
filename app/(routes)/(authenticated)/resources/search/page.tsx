"use client";
import MaterialCard from "@/app/components/material-card";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { Materials } from "@/app/interfaces/material";
import { Suspense } from 'react';

import Link from "next/link";

export default function Search() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const title = searchParams.get("title");
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  let apiUrl = `${baseUrl}/material/`;

  if (category) {
    apiUrl += `?category=${encodeURIComponent(category)}`;
  }
  if (title) {
    apiUrl += `?title=${encodeURIComponent(title)}`;
  }

  const { data, error, isLoading } = useSWR<Materials>(apiUrl);

  if (error) {
    return (
      <div className='col-span-3 md:col-span-6 lg:col-span-12 flex flex-col items-center gap-4'>
        <div className='py-10 lg:pt-32 flex flex-col items-center gap-4'>
        <h2 className="text-center text-gray-300 text-5xl md:text-7xl font-extrabold">
            Login first
          </h2>
          <h2 className="text-center text-gray-600 text-lg">
            You may not have logged in. Please <a href="/login" className="text-blue-500 underline">login</a>  first.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <Suspense>
    <div className='max-w-screen-xl grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-x-6 gap-y-6 mx-auto'>
      <div className='py-10 lg:pt-16 col-span-3 md:col-span-6 lg:col-span-12'>
        <h2 id='marketing' className='scroll-mt-12 mb-2'>
          <a className='text-blue-600 hover:text-blue-500 text-2xl font-semibold'>
            {title ?? category}
          </a>
        </h2>
        {title ? (
          <p className='text-sm text-gray-600'>
            Learning resources for "{title}"
          </p>
        ):(
          <p className='text-sm text-gray-600'>
            Learning resources in Course: "{category}"
          </p>
        )}
      </div>
      <hr className='col-span-3 md:col-span-6 lg:col-span-12 mb-10' />
      {isLoading && (
        <div className='col-span-3 md:col-span-6 lg:col-span-12 flex flex-col items-center gap-4'>
          <h2 className='text-center text-gray-300 text-5xl md:text-7xl font-extrabold'>
            Loading...
          </h2>
        </div>
      )}
      {data?.data.length === 0 ? (
        <div className='col-span-3 md:col-span-6 lg:col-span-12 flex flex-col items-center gap-4'>
          <h2 className='text-center text-gray-300 text-5xl md:text-7xl font-extrabold'>
            Oops!
          </h2>
          <h2 className='text-center text-gray-600 text-lg'>
            No Materials Found
          </h2>

          <Link
            href='/categories'
            className='max-w-sm mt-8 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4'
          >
            Explore Other Resources
          </Link>

        </div>
      ) : (
        data?.data.map((item, index) => <MaterialCard key={index} {...item} />)
      )}
    </div>
    </Suspense>
  );
}
