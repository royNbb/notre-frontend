import { FC } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { IMaterialCard } from "./interface";
const MaterialCard: FC<IMaterialCard> = (props) => {
  return (
    <div className='col-span-3 md:col-span-2 lg:col-span-4 shadow-md rounded-xl px-4 py-2 group cursor-pointer flex flex-col gap-2'>
      <div className='flex justify-between gap-2 items-center'>
        <h3 className='line-clamp-2 group-hover:text-blue-600 font-semibold text-sm lg:text-base text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200'>
          {props.title}
        </h3>
        <FaFilePdf style={{ color: "red" }} />
      </div>
      <p className='text-sm text-gray-500'>{props.description}</p>
    </div>
  );
};

export default MaterialCard;
