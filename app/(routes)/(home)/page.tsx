import Features from "@/app/components/features";
import Hero from "../../components/hero";
import Testimonials from "../../components/testimonials";

export default function Home() {
  return (
    <div className='max-w-screen-xl grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-x-4 mx-auto'>
      <Hero />
      <Testimonials />
      <Features />
    </div>
  );
}
