import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { Analytics } from "@vercel/analytics/react";
export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className='w-full px-4 md:px-8 lg:px-16'>{children}</main>
      <Footer />
      <Analytics />
    </>
  );
}
