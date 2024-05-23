"use client";
import MaterialCard from "@/app/components/material-card";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "@/app/configs/axios";
import type { Histories, History } from "@/app/interfaces/history";

export default function History() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = `${baseUrl}/history/mine`;
  const { data: session, status } = useSession();
  const [history, setHistory] = React.useState<History[]>();

  const fetchHistory = async () => {
    try {
      if (status == "authenticated") {
        const response = await api.get<Histories>(apiUrl, {
          headers: {
            Authorization: `JWT ${session?.accessToken}`,
          },
        });
        setHistory(response.data.data);
      }
    } catch (err: any) {
      alert(JSON.stringify(err.response.data, null, 2));
    }
  };

  React.useEffect(() => {
    fetchHistory();
  }, [status]);

  return (
    <div className='max-w-screen-xl grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-x-6 gap-y-6 mx-auto'>
      <div className='py-10 lg:pt-16 col-span-3 md:col-span-6 lg:col-span-12'>
        <h2 id='marketing' className='scroll-mt-12 mb-2'>
          <a className='text-blue-600 hover:text-blue-500 text-2xl font-semibold'>
            History
          </a>
        </h2>
      </div>
      <hr className='col-span-3 md:col-span-6 lg:col-span-12 mb-10' />
      {history?.length === 0 ? (
        <div className='col-span-3 md:col-span-6 lg:col-span-12 flex flex-col items-center gap-4'>
          <h2 className='text-center text-gray-300 text-5xl md:text-7xl font-extrabold'>
            Oops!
          </h2>
          <h2 className='text-center text-gray-600 text-lg'>
            You haven't view any materials.
          </h2>

          <Link
            href='/categories'
            className='max-w-sm mt-8 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4'
          >
            Explore Learning Resources
          </Link>
        </div>
      ) : (
        history &&
        [...history]
          ?.reverse()
          ?.map((item, index) => (
            <MaterialCard key={index} {...item.historyOf} />
          ))
      )}
    </div>
  );
}
