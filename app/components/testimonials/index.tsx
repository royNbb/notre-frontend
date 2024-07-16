import { FC } from "react";

const testimonials = [
  {
    content:
      '"Really good"',
    name: "Roy Nababan",
    position: "Student",
    company: "CompSci UI",
  },
  {
    content: '"Notre telah membantu saya menjadi skibidi rizzler di ohio dengan level 5000 gyatt dan +99999 aura "',
    name: "Ahmad Yasri",
    position: "Certified Sigma",
    company: "Ohio Rizz Academy",
  },
  {
    content:
      '"Notre has revolutionized the way I approach learning, providing a seamless space to share and access materials."',
    name: "Rahmat Bryan Naufal",
    position: "AI Engineer",
    company: "AMV UI",
  },
];

const Testimonials: FC = () => {
  return (
    <>
      <div className='flex absolute top-[32rem] left-0 -z-50 w-full'>
        <div className='bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-full h-[40rem] md:h-[30rem]'></div>
        <div className='bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-full h-[40rem] md:h-[30rem]'></div>
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
