"use client";
import MaterialCard from "@/app/components/material-card";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { Materials } from "@/app/interfaces/material";
import { Suspense } from 'react';
import Link from "next/link";
import { Categories, CategoriesByLetter } from "@/app/interfaces/category";
import { splitCategoriesByLetter } from "@/app/utils/split-category";
import { api } from "@/app/configs/axios";

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
        <div className="flex flex-col items-center justify-center my-12">
          <h2 className="text-5xl font-extrabold text-gray-300 mb-4">Oops!</h2>
          <p className="text-lg text-gray-600 mb-8">No courses found in {major}</p>
          {/* Uncomment below to add a link for exploring other resources */}
          {/* <Link
            href="/categories"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-sm font-medium transition duration-200"
          >
            Explore Other Resources
          </Link> */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categoriesByLetter).map(([letter, categories]) => (
            <div key={letter} className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-700 mb-2">{letter}</h2>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/resources/search?category=${encodeURIComponent(category.name)}`}
                >
                  <a className="block p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white text-gray-700 hover:text-blue-600">
                    {category.name}
                  </a>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
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
