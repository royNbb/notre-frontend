import { FC } from "react";

const testimonials = [
  {
    content:
      '"JawabanKu has been a game-changer in my learning journey. The ability to access and share learning materials has made studying more efficient."',
    name: "Roy Maruli Tua Nababan",
    position: "Vice President",
    company: "TSA UI",
  },
  {
    content: '"It\'s like a Google Drive, but better."',
    name: "Valerian Salim",
    position: "Coach",
    company: "Kokocoder",
  },
  {
    content:
      '"JawabanKu has revolutionized the way I approach learning, providing a seamless space to share and access materials."',
    name: "Rahmat Bryan Naufal",
    position: "AI Engineer",
    company: "AMV UI",
  },
];

const Testimonials: FC = () => {
  return (
    <>
      <div className='flex w-full justify-center absolute -z-50 bottom-96 right-[32rem] start-3/4 transform -translate-x-1/2 opacity-50'>
        <div className='bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]'></div>
        <div className='bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem]'></div>
      </div>
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className='my-2 col-span-3 md:col-span-2 lg:col-span-4 flex flex-col bg-white border border-gray-200 shadow-md rounded-xl'
        >
          <div className='flex-auto p-4 md:p-6'>
            <p className='text-base text-gray-800 lg:text-xl'>
              <em>{testimonial.content}</em>
            </p>
          </div>

          <div className='p-4 rounded-b-xl md:px-6'>
            <h3 className='text-sm font-semibold text-gray-800 sm:text-base'>
              {testimonial.name}
            </h3>
            <p className='text-sm text-gray-500'>
              {testimonial.position} | {testimonial.company}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Testimonials;
