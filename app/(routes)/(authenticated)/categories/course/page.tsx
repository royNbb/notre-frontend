"use client";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import Link from "next/link";
import { Categories, CategoriesByLetter } from "@/app/interfaces/category";
import { splitCategoriesByLetter } from "@/app/utils/split-category";

// Fetcher function for useSWR
const fetcher = async (url: string): Promise<Categories> => {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

// Component to fetch and display categories
function CategoriesContent() {
  const searchParams = useSearchParams();
  const major_id = searchParams.get("major_id");
  const major = searchParams.get("major");

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  let apiUrl = `${baseUrl}/category/`;
  if (major_id) {
    apiUrl += `?type=Course&major=${encodeURIComponent(major_id)}`;
  }

  const { data, error } = useSWR(apiUrl, fetcher);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-5xl font-extrabold text-gray-300 mb-4">Shoot!</h2>
        <p className="text-lg text-gray-600">Something bad happened. Please try again later.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-5xl font-extrabold text-gray-300 mb-4">Loading...</h2>
      </div>
    );
  }

  const categoriesByLetter: CategoriesByLetter = splitCategoriesByLetter(data);

  return (
    <div className="max-w-screen-xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800">Categories</h1>
      </div>

      <hr className="my-8" />

      <div className="py-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">{major}</h2>
        <p className="text-sm text-gray-600">Showing registered courses in "{major}"</p>
      </div>

      {data.data.length === 0 ? (
        <div>
          <div className="flex flex-col items-center justify-center my-12  p-8 ">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Oops!</h2>
            <p className="text-lg text-gray-700 mb-8">0 course found in {major}</p>
          </div>
        </div>
        

      ) : (
        <div>
          <div className="space-y-8">
            {Object.entries(categoriesByLetter).map(([letter, categories]) => (
              <div key={letter}>
              <h2 className="text-3xl font-bold text-gray-700 mb-4">
                {letter}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/resources/search?category=${encodeURIComponent(category.name)}`}
                  >
                    <div className="block p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white text-gray-700 hover:text-blue-600">
                      {category.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center my-12 mt-18 p-3 rounded-lg shadow-lg">
        <p className="text-xl font-bold text-gray-600 mb-2">Don't see the course you're looking for?</p>
        <p className="text-gray-600 mb-2">Add it to our system so others and you can share resources in that course.</p>
        <Link
          href="/categories/course/add"
          className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800 mb-10"
        >
          Add Course
        </Link>
      </div>
    </div>
  );
}

// Main component using Suspense
export default function Course() {
  return (
    <Suspense fallback={<div className="text-center text-lg text-gray-600">Loading...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}
