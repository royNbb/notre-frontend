import { FC } from "react";

const testimonials = [
  {
    content:
      "\"It's like a Google Drive, but better.\"",
    name: "Valerian Salim",
    position: "Coach",
    company: "Kokocoder",
  },
  {
    content:
      "\"JawabanKu has been a game-changer in my learning journey. The ability to access and share learning materials has made studying more efficient.\"",
    name: "Roy Maruli Tua Nababan",
    position: "Wakil Ketua",
    company: "TSA UI",
  },
  {
    content:
      "\"It's like a Google Drive, but better.\"",
    name: "Valerian Salim",
    position: "Coach",
    company: "Kokocoder",
  },
];

const Testimonials: FC = () => {
  return (
    <>
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className='my-2 col-span-3 md:col-span-2 lg:col-span-4 flex flex-col bg-white border border-gray-200 shadow-md rounded-xl dark:bg-slate-900 dark:border-gray-700'
        >
          <div className='flex-auto p-4 md:p-6'>
            <p className='text-base text-gray-800 lg:text-xl dark:text-white'>
              <em>{testimonial.content}</em>
            </p>
          </div>

          <div className='p-4 rounded-b-xl md:px-6'>
            <h3 className='text-sm font-semibold text-gray-800 sm:text-base dark:text-gray-200'>
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
