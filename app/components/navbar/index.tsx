"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { useSession, signOut } from "next-auth/react";

const Navbar: FC = () => {
  const pathname = usePathname();
  const { data, status } = useSession();

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm sticky top-0 ">
      <nav
        className="mt-6 relative max-w-screen-xl w-full backdrop-blur-md bg-white/30 border border-gray-200 rounded-[36px] mx-2 py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-none text-xl font-semibold">
            JawabanKu
          </Link>
          <div className="md:hidden">
            <button
              type="button"
              className="hs-collapse-toggle w-8 h-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div
          id="navbar-collapse-with-animation"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
        >
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
            <Link
              href="/"
              className={twMerge(
                "font-medium text-gray-500 hover:text-gray-400 md:py-6",
                pathname === "/" && "text-blue-600"
              )}
            >
              Home
            </Link>
            <Link
              href="/resources"
              className={twMerge(
                "font-medium text-gray-500 hover:text-gray-400 md:py-6",
                pathname === "/resources" && "text-blue-600"
              )}
            >
              Resources
            </Link>

            <Link
              href="/categories"
              className={twMerge(
                "font-medium text-gray-500 hover:text-gray-400 md:py-6",
                pathname === "/categories" && "text-blue-600"
              )}
            >
              Categories
            </Link>

            <Link
              href="/history"
              className={twMerge(
                "font-medium text-gray-500 hover:text-gray-400 md:py-6",
                pathname === "/history" && "text-blue-600"
              )}
            >
              History
            </Link>

            <Link
              className={twMerge(
                "flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 md:border-s md:border-gray-300 md:my-6 md:ps-6",
                pathname === "/profile" && "text-blue-600"
              )}
              href={status == "authenticated" ? "/profile" : "/login"}
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {status == "authenticated" ? "Profile" : "Login"}
            </Link>
            {status == "authenticated" && (
              <div
                onClick={() => signOut({ callbackUrl: "/" })}
                className="cursor-pointer flex items-center gap-x-2 font-medium text-red-600 md:border-s md:border-gray-300 md:my-6 md:ps-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                  />
                </svg>
                Logout
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
