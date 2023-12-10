import type { Metadata } from "next";
import { fonts } from "./fonts";
import "./globals.css";
import { ChakraProviders } from "./providers/chakra-providers";
import { twMerge } from "tailwind-merge";
import { SWRProviders } from "./providers/swr-providers";

export const metadata: Metadata = {
  title: "Jawabanku",
  description: "Sharing your learning materials has never been easier.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={twMerge(fonts.inter.className, "flex flex-col min-h-screen")}
      >
        <ChakraProviders>
          <SWRProviders>{children}</SWRProviders>
        </ChakraProviders>
      </body>
    </html>
  );
}
