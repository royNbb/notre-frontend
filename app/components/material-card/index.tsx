import { FC } from "react";
import {
  FaFileExcel,
  FaFileImage,
  FaFilePdf,
  FaFileWord,
  FaFileCode,
  FaFileCsv,
  FaFile,
} from "react-icons/fa6";
import Link from "next/link";
import { Material } from "@/app/interfaces/material";
import { getFileExtension } from "@/app/utils/get-file-ext";

const FileIcon = ({ extension }: { extension: string }) => {
  const iconMap = {
    pdf: <FaFilePdf style={{ color: "red" }} size={24} />,
    doc: <FaFileWord style={{ color: "blue" }} size={24} />,
    docx: <FaFileWord style={{ color: "blue" }} size={24} />,
    xlsx: <FaFileExcel style={{ color: "green" }} size={24} />,
    jpg: <FaFileImage style={{ color: "orange" }} size={24} />,
    jpeg: <FaFileImage style={{ color: "orange" }} size={24} />,
    png: <FaFileImage style={{ color: "orange" }} size={24} />,
    js: <FaFileCode style={{ color: "gold" }} size={24} />,
    py: <FaFileCode style={{ color: "lightblue" }} size={24} />,
    go: <FaFileCode style={{ color: "lightblue" }} size={24} />,
    csv: <FaFileCsv style={{ color: "lightgreen" }} size={24} />,
  };

  return (
    (iconMap as any)[extension] || (
      <FaFile style={{ color: "grey" }} size={24} />
    )
  );
};

const MaterialCard: FC<Material> = (props) => {
  return (
    <Link
      href={`/resources/material/${props.slug}`}
      className='col-span-3 md:col-span-2 lg:col-span-4 shadow-md rounded-xl px-4 py-2 group cursor-pointer flex flex-col gap-2'
    >
      <div className='flex justify-between gap-2 items-center'>
        <h3 className='line-clamp-2 group-hover:text-blue-600 font-semibold text-sm lg:text-base text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200'>
          {props.title}
        </h3>
        <FileIcon extension={getFileExtension(props.content)} />
      </div>
      <p className='text-xs text-gray-500 line-clamp-1'>{props.description}</p>
    </Link>
  );
};

export default MaterialCard;
