import Link from "next/link";
import { Categories, CategoriesByLetter } from "@/app/interfaces/category";
import { splitCategoriesByLetter } from "@/app/utils/split-category";

async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/category/`, {
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
    const categoriesByLetter: CategoriesByLetter =
      splitCategoriesByLetter(data);

    return (
      <div className='max-w-screen-xl grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-x-6 gap-y-6 mx-auto'>
        <div className='py-10 lg:pt-10 col-span-3 md:col-span-6 lg:col-span-12 mt-12'>
          <h1 className='text-3xl lg:text-5xl font-bold text-gray-700 text-center'>
            Categories
          </h1>
        </div>

        <hr className='col-span-3 md:col-span-6 lg:col-span-12 mb-10' />

        {Object.entries(categoriesByLetter).map(([letter, categories]) => (
          <div key={letter} className='col-span-3 md:col-span-6 lg:col-span-12 mb-4'>
            <h2 className='text-lg font-semibold mb-2'>{letter}</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {categories.map((item, index) => (
                <Link
                  key={index}
                  href={`/resources/search?category=${encodeURIComponent(
                    item.name
                  )}`}
                  className='cursor-pointer hover:text-blue-600 text-gray-600 text-left'
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
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
