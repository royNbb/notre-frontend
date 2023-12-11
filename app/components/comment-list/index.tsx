"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Report } from "@/app/interfaces/report";
import axios from "axios";

import { Comment } from "@/app/interfaces/comment";
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
  Textarea,
  useToast,
} from "@chakra-ui/react";

interface CommentsListProps {
  comments: Comment[];
  type: string;
}


const CommentsList: React.FC<CommentsListProps> = ({ comments, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("");
  const toast = useToast();
  const { data: session } = useSession();
  const user = session?.user;
  const handleSubmit = async (data: Report) => {
    const token = session?.accessToken;
    console.log(token);
    console.log(data.related_model_app_label);
    console.log(data.related_model_name);
    console.log(data.related_model_id);
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
      console.log(error);
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);


  const onEditComment = (comment: Comment) => {
    // Set the selected comment and open the edit modal
    setEditedCommentContent(comment.content);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditedCommentContent("");
    setSelectedComment(null);
  };

  const handleEditComment = async (comment_id: number, content: string ) => {
    // Add logic to update the comment using editedCommentContent and selectedComment.id
    console.log("Editting comment ", comment_id);
    
    const token = session?.accessToken;
    console.log(token);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const urlPost = `${baseUrl}/comment/${comment_id}`;
    try {
      const result = await axios
        .put(
          urlPost,
          {
            content: content
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
            title: "Comment Edited!",
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
        title: "Comment Can't Be Edited!",
        description: "Check your account",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    closeEditModal();
  };

  const handleDeleteComment = async (comment_id: number) => {
    console.log("Deleting comment ", comment_id);
  
    const token = session?.accessToken;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const urlPost = `${baseUrl}/comment/${comment_id}`;
    
    try {
      await axios.delete(urlPost, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
      });
  
      toast({
        title: "Comment Deleted!",
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
  
      // Additional logic after successful deletion if needed
      setDescription("");
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Comment Deletion Failed!",
        description: "Check your account",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  
    closeEditModal();
  };
  

  return (
    <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto flex flex-col gap-4">
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments:</h2>
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="border p-4 rounded-lg shadow-md relative"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-600 dark:text-gray-600">
                  <span className="flex items-center mr-2">
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
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <span className="ml-2">{comment.owner.username}</span>
                </div>
                {comment.updatedAt && (Math.floor((comment.updatedAt - comment.createdAt) / 1000) > 1) && (
                  <div className="text-xs text-gray-500">
                    Updated at:{" "}
                    {new Date(comment.updatedAt * 1000).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>
              <div className="text-gray-800 dark:text-gray-700 font-bold text-md">
                {comment.content}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <span>
                  {new Date(comment.createdAt * 1000).toLocaleDateString(
                    "en-US",
                    { day: "numeric", month: "long", year: "numeric" }
                  )}
                </span>
                {/* Report button for each comment */}
                <button
                  type="button"
                  className="ml-2 py-1 px-2 bg-gray-200 text-gray-700 rounded-md hover:bg-red-500 hover:text-white"
                  onClick={onOpen}
                >
                  Report
                </button>
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
                          Please remember to report a comment only if it
                          violates the community guidelines or is inappropriate.
                          This includes offensive language, hate speech,
                          personal attacks, spam, or irrelevant content.
                          Reporting should be done responsibly and not for
                          disagreements over opinions or minor issues. If you're
                          unsure whether a comment should be reported, you can
                          always reach out to a moderator for guidance.
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
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
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
                            related_model_id: comment.owner.id,
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
              <div>
              {user && comment.owner.id === user.id && (
                <>
                  <button
                    type="button"
                    className="ml-2 py-1 px-2 bg-gray-200 text-gray-700 rounded-md hover:bg-red-500 hover:text-white"
                    onClick={() => onEditComment(comment)}
                  >
                    Edit
                  </button>
                  <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Edit Comment</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <FormControl>
                          <FormLabel>Edit your comment:</FormLabel>
                          <Textarea
                            value={editedCommentContent}
                            onChange={(e) => setEditedCommentContent(e.target.value)}
                          />
                        </FormControl>
                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() =>handleEditComment(comment.id, editedCommentContent)}>
                          Edit Comment
                        </Button>
                        <Button colorScheme="red" onClick={() =>handleDeleteComment(comment.id)}>
                          Delete Comment
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentsList;
