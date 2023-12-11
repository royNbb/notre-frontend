import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import { Material } from "@/app/interfaces/material";
import { getIdFromSlug } from "@/app/utils/get-id-from-slug";
import ReportModal from "@/app/components/material-details";
import dayjs from "dayjs";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { CiFileOn } from "react-icons/ci";

async function getData(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const id = getIdFromSlug(slug);

  try {
    const res = await fetch(`${baseUrl}/api/v1/material/${id}/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json().then((data) => data.data);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
}

export default async function MaterialDetails({
  params,
}: {
  params: { slug: string };
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  try {
    const data: Material = await getData(params.slug);
    console.log(data);

    return (
      <>
        <div>hai</div>
        <ReportModal data={data} type={"material"} />
      </>
    );
  } catch (error) {
    console.log("hai");
    console.log(error);
    return (
      <div className="col-span-3 md:col-span-6 lg:col-span-12 flex flex-col items-center gap-4">
        <div className="py-10 lg:pt-32 flex flex-col items-center gap-4">
          <h2 className="text-center text-gray-300 text-5xl md:text-7xl font-extrabold">
            Shoot!
          </h2>
          <h2 className="text-center text-gray-600 text-lg">
            Something bad hapenned. Please try again later.
          </h2>
        </div>
      </div>
    );
  }
}
