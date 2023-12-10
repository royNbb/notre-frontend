"use client";
import { SWRConfig } from "swr";
import { fetcher } from "../configs/fetcher";

export const SWRProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};
