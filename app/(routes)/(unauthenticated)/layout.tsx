import Footer from "../../components/footer";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className='w-full px-4 md:px-8 lg:px-16'>{children}
      </main>
      <Footer />
    </>
  );
}
