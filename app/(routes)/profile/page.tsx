'use client'

import { useEffect, useState } from "react";
import { api } from "@/app/configs/axios";
import { User } from '@/app/interfaces/user';
import { Spinner } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

export default function Me() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const toast = useToast();
    let apiUrl = `${baseUrl}/users/me`;
    let updateUrl = `${baseUrl}/users/update/`;
    let passwordUrl = `${baseUrl}/users/change-password/`

    const { isOpen, onOpen, onClose } = useDisclosure()


    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    const [editMode, setEditMode] = useState<boolean>(false);

    const [newPassword, setNewPassword] = useState<string>('');
    const [oldPassword, setOldPassword] = useState<string>('');

    const resetEdit = (user: User) => {
        setName(user.name)
        setEmail(user.email)
        setUsername(user.username)

        setNewPassword('')
        setOldPassword('')
    }

    const handleChangePassword = async () => {
        if (!user) return

        const reqData = {
            id: user.id,
            new_password: newPassword,
            old_password: oldPassword,
        }

        try {
            const response = await api.post(passwordUrl, reqData, {
                headers: {
                    'Authorization': `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNTcxMDY5LCJpYXQiOjE3MDIyNzUwNjksImp0aSI6IjZmYmFkZjUzMTc0YzQ1OWZhNmQ5YmQxMjg5MjE0NDBhIiwidXNlcl9pZCI6OX0.tmFfYYTl1uSN5e2gQRwpVEUOFCCcTN2ZnceEgQcBURc`
                }
            })

            toast({
                title: 'Password Changed',
                description: 'Password successfully changed',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

            resetEdit(user)
            onClose()
        }
        catch (err: any) {
            toast({
                title: 'Something went wrong',
                description: err.response.data.error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const handleEdit = async () => {
        if (!user) return
        
        const userData = {
            id: user.id,
            name,
            email,
            username
        }

        try {
            const response = await api.post(updateUrl, userData, {
                headers: {
                    'Authorization': `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNTcxMDY5LCJpYXQiOjE3MDIyNzUwNjksImp0aSI6IjZmYmFkZjUzMTc0YzQ1OWZhNmQ5YmQxMjg5MjE0NDBhIiwidXNlcl9pZCI6OX0.tmFfYYTl1uSN5e2gQRwpVEUOFCCcTN2ZnceEgQcBURc`
                }
            })
            setUser(response.data.data)
            resetEdit(response.data.data)
            setEditMode(false)

            toast({
                title: 'Account updated',
                description: 'Account successfully updated',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }
        catch (err: any) {
            toast({
                title: 'Something went wrong',
                description: err.response.data.error.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get<User>(apiUrl, {
                    headers: {
                        'Authorization': `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAzNTcxMDY5LCJpYXQiOjE3MDIyNzUwNjksImp0aSI6IjZmYmFkZjUzMTc0YzQ1OWZhNmQ5YmQxMjg5MjE0NDBhIiwidXNlcl9pZCI6OX0.tmFfYYTl1uSN5e2gQRwpVEUOFCCcTN2ZnceEgQcBURc`
                    }
                })
                setUser(response.data)
                resetEdit(response.data)
            }
            catch (err: any) {
                alert(JSON.stringify(err.response.data, null, 2));
                setError(err.message);
            }
            finally{
                setIsLoading(false);
            }
        }

        fetchUser();
    }, [])

    if (error) {
        return <div>Something went wrong: {error}</div>
    }

    return (
        <div className="w-full h-full flex justify-center items-center pt-10 text-2xl">
            {isLoading ? <Spinner /> :
                (
                    user ? (
                        <div className="flex flex-col items-center">
                            <div className="w-48 h-48 overflow-hidden rounded-full mb-10">
                                <img
                                src="https://picsum.photos/200"
                                alt="Anonymous User"
                                className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <p className="font-bold">Name :</p>
                                {!editMode ? <p>{user.name}</p> : <input value={name} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" onChange={(e) => setName(e.target.value)}/>}
                                <p className="font-bold">Email :</p>
                                {!editMode ? <p>{user.email}</p> : <input value={email} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" onChange={(e) => setEmail(e.target.value)}/>}
                                <p className="font-bold">Username :</p>
                                {!editMode ? <p>{user.username}</p> : <input value={username} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" onChange={(e) => setUsername(e.target.value)}/>}
                            </div>

                            {
                                !editMode ?

                                <div className="flex justify-evenly w-full">
                                    <button className="w-1/3 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={() => setEditMode(editMode => !editMode)}>Edit Profile</button>
                                    <button className="w-1/3 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={onOpen}>Change Password</button>
                                </div>
                                :
                                <div className="flex justify-evenly w-full">
                                    <button className="w-1/3 py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={() => {resetEdit(user); setEditMode(false)}}>Cancel</button>
                                    <button className="w-1/3 py-3 px-4 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={handleEdit}>Submit</button>
                                </div>
                            }
                        </div>
                    ) : <></>
                )
            }

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Change Password</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <p className="font-bold pt-3">Old Password :</p>
                        <input placeholder="Type your old password" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" onChange={(e) => setOldPassword(e.target.value)}/>

                        <p className="font-bold pt-3">New Password :</p>
                        <input placeholder="Input your new password" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" onChange={(e) => setNewPassword(e.target.value)}/>
                    </div>
                
                </ModalBody>

                <ModalFooter>
                    <div className="flex justify-evenly w-full">
                        <button className="w-1/3 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={onClose} >Cancel</button>
                        <button className="w-1/3 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" onClick={handleChangePassword} >Submit</button>
                    </div>
                </ModalFooter>
                </ModalContent>
            </Modal>
            
        </div>
    );
};