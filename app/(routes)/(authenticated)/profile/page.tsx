"use client";

import { useEffect, useState } from "react";
import { api } from "@/app/configs/axios";
import { User } from "@/app/interfaces/user";
import { Input, Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function Me() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const toast = useToast();
  let apiUrl = `${baseUrl}/users/me`;
  let updateUrl = `${baseUrl}/users/update/`;
  let passwordUrl = `${baseUrl}/users/change-password/`;

  const { data, status } = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [editMode, setEditMode] = useState<boolean>(false);

  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");

  const resetEdit = (user: User) => {
    setName(user.name);
    setEmail(user.email);
    setUsername(user.username);
    setNewPassword("");
    setOldPassword("");
  };

  const handleChangePassword = async () => {
    if (!user) return;

    const reqData = {
      id: user.id,
      new_password: newPassword,
      old_password: oldPassword,
    };

    try {
      const response = await api.post(passwordUrl, reqData, {
        headers: {
          Authorization: `JWT ${data?.accessToken}`,
        },
      });

      toast({
        title: "Password Changed",
        description: "Password successfully changed",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });

      resetEdit(user);
      onClose();
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err.response.data.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleEdit = async () => {
    if (!user) return;

    const userData = {
      id: user.id,
      name,
      email,
      username,
    };

    try {
      const response = await api.post(updateUrl, userData, {
        headers: {
          Authorization: `JWT ${data?.accessToken}`,
        },
      });
      setUser(response.data.data);
      resetEdit(response.data.data);
      setEditMode(false);

      toast({
        title: "Account updated",
        description: "Account successfully updated",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err.response.data.error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const fetchUser = async () => {
    try {
      if (status == "authenticated") {
        const response = await api.get<User>(apiUrl, {
          headers: {
            Authorization: `JWT ${data?.accessToken}`,
          },
        });
        setUser(response.data);
        resetEdit(response.data);
      }
    } catch (err: any) {
      alert(JSON.stringify(err.response.data, null, 2));
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [status]);

  if (error) {
    return <div>Something went wrong: {error}</div>;
  }

  return (
    <div className='w-full h-full flex justify-center items-center pt-10 text-2xl'>
      {isLoading ? (
        <div className='col-span-3 md:col-span-6 lg:col-span-12 flex flex-col items-center gap-4 mt-24'>
          <h2 className='text-center text-gray-300 text-5xl md:text-7xl font-extrabold'>
            Loading...
          </h2>
        </div>
      ) : user ? (
        <div className='flex flex-col items-center'>
          <div className='w-48 h-48 overflow-hidden rounded-full mb-10'>
            <img
              src='https://picsum.photos/200'
              alt='Anonymous User'
              className='w-full h-full object-cover'
            />
          </div>
          <div className='grid grid-cols-2 gap-4 mb-10'>
            <p className='font-bold'>Name :</p>
            {!editMode ? (
              <p className='text-base'>{user.name}</p>
            ) : (
              <Input
                value={name}
                className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <p className='font-bold'>Email :</p>
            {!editMode ? (
              <p className='text-base'>{user.email}</p>
            ) : (
              <Input
                value={email}
                className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <p className='font-bold'>Username :</p>
            {!editMode ? (
              <p className='text-base'>{user.username}</p>
            ) : (
              <Input
                value={username}
                className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                onChange={(e) => setUsername(e.target.value)}
              />
            )}
          </div>

          {!editMode ? (
            <div className='flex justify-evenly w-full'>
              <button
                className='w-1/3 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'
                onClick={() => setEditMode((editMode) => !editMode)}
              >
                Edit Profile
              </button>
              <button
                className='w-1/3 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none'
                onClick={onOpen}
              >
                Change Password
              </button>
            </div>
          ) : (
            <div className='flex justify-evenly w-full'>
              <button
                className='w-1/3 py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-700 disabled:opacity-50 disabled:pointer-events-none'
                onClick={() => {
                  resetEdit(user);
                  setEditMode(false);
                }}
              >
                Cancel
              </button>
              <button
                className='w-1/3 py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'
                onClick={handleEdit}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='grid grid-cols-2 gap-4 mb-10'>
              <p className='font-bold pt-3'>Old Password :</p>
              <Input
                placeholder='Type your old password'
                className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                onChange={(e) => setOldPassword(e.target.value)}
              />

              <p className='font-bold pt-3'>New Password :</p>
              <Input
                placeholder='Input your new password'
                className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <div className='flex justify-evenly w-full'>
              <button
                className='w-1/3 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none'
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className='w-1/3 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none'
                onClick={handleChangePassword}
              >
                Submit
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
