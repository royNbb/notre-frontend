import Link from "next/link";
import type { Categories, CategoriesByLetter } from "@/app/interfaces/category";
import { splitCategoriesByLetter } from "@/app/utils/split-category";

async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/category/?type=Major`, {
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

export default async function Categories() {
  try {
    const data: Categories = await getData();
    const categoriesByLetter: CategoriesByLetter = splitCategoriesByLetter(data);

    return (
      <div className="max-w-screen-xl mx-auto py-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Categories
          </h1>
        </div>
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
                    href={`/categories/course?major=${encodeURIComponent(category.name)}&major_id=${encodeURIComponent(category.id)}`}
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
    );
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-5xl font-extrabold text-gray-300 mb-4">
          Shoot!
        </h2>
        <p className="text-lg text-gray-600">
          Something bad happened. Please try again later.
        </p>
      </div>
    );
  }
}
