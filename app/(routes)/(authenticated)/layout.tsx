import Link from "next/link";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { Analytics } from "@vercel/analytics/react";
import { FaPlus } from "react-icons/fa6";
export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className='w-full px-4 md:px-8 lg:px-16'>{children}</main>
      <Link
          href="/resources/upload"
          className="fixed bottom-4 right-4 inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800"
        >
          <FaPlus className="text-white" /> {/* Plus icon */}
          Share Your Resource
      </Link>

      <Footer />
      <Analytics />
    </>
  );
}
