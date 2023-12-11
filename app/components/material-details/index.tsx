"use client";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import { Material } from "@/app/interfaces/material";
import { Report } from "@/app/interfaces/report";
import { Comment } from "@/app/interfaces/comment";
import { getIdFromSlug } from "@/app/utils/get-id-from-slug";
import axios from "axios";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
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
  FormLabel,
  FormControl,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { CiFileOn } from "react-icons/ci";
import React, { FC, useState } from "react";

export default function ReportModal({
  data,
  type,
}: {
  data: Material;
  type: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCommentModalOpen,
    onOpen: onCommentModalOpen,
    onClose: onCommentModalClose,
  } = useDisclosure();
  const [commentContent, setCommentContent] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  const { data: session } = useSession();
  const handleSubmit = async (data: Report) => {
    const token = session?.accessToken;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const urlPost = `${baseUrl}/report/create/`;
    try {
      const result = await axios
        .post(
          urlPost,
          {
            description: data.description,
            related_model_app_label: data.related_model_app_label,
            related_model_name: data.related_model_name,
            related_model_id: data.related_model_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`,
            },
          }
        )
        .then(() => {
          toast({
            title: "Report Submitted!",
            status: "success",
            duration: 4000,
            position: "top",
            isClosable: true,
          });
        })
        .then(() => setDescription(""))
        .then(onClose);
    } catch (error) {
      toast({
        title: "Report Cant Be Submitted!",
        description: "Please login to your account",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleCommentSubmit = async (content: string, material_id: number) => {
    // Add logic to submit the comment, e.g., using an API
    console.log("Submitting comment:", content);

    const token = session?.accessToken;
    console.log(token);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const urlPost = `${baseUrl}/comment/`;
    try {
      const result = await axios
        .post(
          urlPost,
          {
            material: material_id,
            content: content,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`,
            },
          }
        )
        .then(() => {
          toast({
            title: "Comment Posted!",
            status: "success",
            duration: 4000,
            position: "top",
            isClosable: true,
          });
        })
        .then(() => setDescription(""))
        .then(onClose);
    } catch (error) {
      console.log(error);
      toast({
        title: "Comment Can't Be Posted!",
        description: "Please login to your account",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    // Reset state and close the modal
    setCommentContent("");
    onCommentModalClose();
  };

  console.log(data);
  return (
    <>
      <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto flex flex-col gap-4">
        <div className="max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
              <div className="grow">
                <div className="flex justify-between items-center gap-x-2">
                  <div>
                    <div className="hs-tooltip inline-block [--trigger:hover] [--placement:bottom]">
                      <div className="hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {data.owner.name != ""
                            ? data.owner.name
                            : "The owner"}
                        </span>
                      </div>
                    </div>

                    <ul className="text-xs text-gray-500">
                      <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full">
                        {dayjs(data.createdAt * 1000).format(
                          "DD MMMM YYYY | HH:mm"
                        )}
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={onOpen}
                  >
                    <FaExclamationTriangle style={{ color: "red" }} size={16} />
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Modal
              isOpen={isOpen}
              onClose={onClose}
              isCentered
              motionPreset="slideInBottom"
              size="lg"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Report </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel
                      fontSize="xl"
                      pt={3}
                      fontWeight="bold"
                      fontFamily={"sans-serif"}
                    >
                      Why are you reporting this post?
                    </FormLabel>
                    <FormLabel className="font-bold">
                      Please remember that reporting a material may result in
                      the removal of content uploaded by your friends. Your
                      report has the potential to impact not only your
                      experience but also your friends. We encourage you to take
                      this responsibility seriously, as it's valuable not just
                      for you but for your friends as well.
                    </FormLabel>
                  </FormControl>
                  <FormControl className="pt-5">
                    <FormLabel fontSize="lg" fontWeight={"bold"}>
                      Reason
                    </FormLabel>
                    <FormLabel fontSize="sm" py={1} opacity={0.6}>
                      Help us understand the problem
                    </FormLabel>
                    <Textarea
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Type your report details here"
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() =>
                      handleSubmit({
                        description: description,
                        related_model_app_label: type,
                        related_model_name: type,
                        related_model_id: data.owner.id,
                      })
                    }
                  >
                    Submit
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>

          <div className="space-y-5 md:space-y-8">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold md:text-3xl dark:text-white">
                {data.title}
              </h2>

              <p className="text-lg text-gray-800 dark:text-gray-200">
                {data.description}
              </p>
            </div>
          </div>
        </div>
        <a href={data.content} target="_blank">
          <Button
            leftIcon={<CiFileOn />}
            colorScheme="teal"
            variant="solid"
            className="w-full flex"
          >
            Download File
          </Button>
        </a>
        <div className="w-full bg-blue-600 rounded-xl py-2.5 font-bold text-white flex justify-center items-center">
          <Link
            className="w-full h-full text-center"
            href={`/resources/material/update/${data.id}`}
          >
            Edit Material
          </Link>
        </div>
        {data.categories.map((category) => (
          <Link
            key={category.id}
            className="max-w-max m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 "
            href={`/resources/search?category=${encodeURIComponent(
              category.name
            )}`}
          >
            {category.name}
          </Link>
        ))}
        <div className="sticky bottom-6 inset-x-0 text-center mt-16">
          <div className="inline-block bg-white shadow-md rounded-full py-3 px-4 dark:bg-gray-800">
            <div className="flex items-center gap-x-1.5">
              <div className="hs-tooltip inline-block">
                <button
                  type="button"
                  className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  onClick={onCommentModalOpen}
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                  </svg>
                  Comment
                  <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-black"
                    role="tooltip"
                  >
                    Comment
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isCommentModalOpen}
          onClose={onCommentModalClose}
          isCentered
          motionPreset="slideInBottom"
          size="lg"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Comment</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Type your comment here"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleCommentSubmit(commentContent, data.id)}
              >
                Submit
              </Button>
              <Button onClick={onCommentModalClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
