import type { Metadata } from "next";
import { fonts } from "./fonts";

import "./globals.css";
import { ChakraProviders } from "./providers/chakra-providers";


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
      <body className={fonts.inter.className}>
        <ChakraProviders>{children}</ChakraProviders>
      </body>
    </html>
  );
}
