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


import { Comment } from "@/app/interfaces/comment";
import CommentsList from "@/app/components/comment-list";


async function getData(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const id = getIdFromSlug(slug);

  try {
    const res = await fetch(`${baseUrl}/material/${id}/`, {
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
async function getComments(materialId: number): Promise<Comment[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/comment/?is_by_owner=False&material=${materialId}`, {
      cache: "no-store",
    });
    console.log("SUDAH COBA AMBIL COMMENT")
    console.log(res.ok)

    if (!res.ok) {
      throw new Error("Failed to fetch comments");
    }

    return res.json().then((data) => data.data);
  } catch (error) {
    throw new Error("Failed to fetch comments");
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
    const commentsData: Comment[] = await getComments(data.id);

    return (
      <div>
        <ReportModal data={data} type={"material"} />
        {<CommentsList comments={commentsData} />}
      </div>
    );
  } catch (error) {
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
