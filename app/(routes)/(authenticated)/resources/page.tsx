"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from 'react'

export default function Resources() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (!value) return;
    router.push(`/resources/search?title=${value}`);
  };

  return (
    <div className='max-w-screen-xl grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-24 xl:pt-40'>
      <div className='text-center col-span-3 md:col-span-6 lg:col-span-12'>
        <h1 className='text-4xl sm:text-6xl font-bold text-gray-800'>
          Resources
        </h1>

        <p className='mt-3 text-gray-600'>
          Find and share resources.
        </p>

        <div
          className="pt-10">
          <Link
            href="/resources/upload"
            className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800"
          >
            Share a Resource
          </Link>
        </div>

        <div className='mt-7 sm:mt-12 mx-auto max-w-xl relative'>
          <div className='relative z-10 flex items-center space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100'>
            <Suspense>
              <Input
                placeholder="Search materials"
                variant="unstyled"
                className="mx-4 leading-loose"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </Suspense>

            <div className='flex-[0_0_auto]' onClick={handleSearch}>
              <div className='w-[46px] h-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
            <svg
              className="w-16 h-auto text-orange-500"
              width="121"
              height="135"
              viewBox="0 0 121 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
            <svg
              className="w-40 h-auto text-cyan-500"
              width="347"
              height="188"
              viewBox="0 0 347 188"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <p className='mt-12 text-gray-600'>
          or{" "}
          <Link href="/categories" className="text-blue-600 hover:underline">
            browse
          </Link>{" "}
          our curated categories.
        </p>
      </div>
    </div>
  );
}
