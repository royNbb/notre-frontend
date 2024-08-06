"use client";

import React, { useState } from "react";
import { Input, useToast } from "@chakra-ui/react";
import { api } from "../../../configs/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Register() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const toast = useToast();
  const router = useRouter();

  let apiUrl = `${baseUrl}/users/`;

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        status: "error",
        duration: 2000,
        position: "top",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 2000,
        position: "top",
      });
      return;
    }

    const userData = {
      email,
      username,
      name,
      password,
    };

    try {
      const res = await api.post(apiUrl, userData);
      toast({
        title: "Account created",
        description: "Account successfully created",
        status: "success",
        duration: 2000,
        position: "top",
      });

      router.push("/login");
    } catch (e: any) {
      toast({
        title: "Error",
        description: "Error creating account. Please try again.",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  const { status } = useSession();

  if (status == "authenticated") {
    router.push("/");
  }

  return (
    <div className='w-full max-w-lg mx-auto p-6 flex justify-center pt-16'>
      <div className='mt-7 bg-white border border-gray-200 rounded-xl shadow-sm w-full'>
        <div className='p-4 sm:p-7'>
          <div className='text-center'>
            <h1 className='block text-2xl font-bold text-gray-800'>
              Sign up
            </h1>
            <p className='mt-2 text-sm text-gray-600'>
              Already have an account?{" "}
              <Link
                className='text-blue-600 decoration-2 hover:underline font-medium'
                href='/login'
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className='mt-5'>
            <form onSubmit={handleSignUp}>
              <div className='grid gap-y-4'>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm mb-2'
                  >
                    Email address
                  </label>
                  <div className='relative'>
                    <Input
                      type='email'
                      id='email'
                      name='email'
                      className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                      required
                      aria-describedby='email-error'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className='hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                      <svg
                        className='h-5 w-5 text-red-500'
                        width='16'
                        height='16'
                        fill='currentColor'
                        viewBox='0 0 16 16'
                        aria-hidden='true'
                      >
                        <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
                      </svg>
                    </div>
                  </div>
                  <p
                    className='hidden text-xs text-red-600 mt-2'
                    id='email-error'
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='username'
                    className='block text-sm mb-2'
                  >
                    Username
                  </label>
                  <div className='relative'>
                    <Input
                      type='text'
                      id='username'
                      name='username'
                      className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                      required
                      aria-describedby='password-error'
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className='hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                      <svg
                        className='h-5 w-5 text-red-500'
                        width='16'
                        height='16'
                        fill='currentColor'
                        viewBox='0 0 16 16'
                        aria-hidden='true'
                      >
                        <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
                      </svg>
                    </div>
                  </div>
                  <p
                    className='hidden text-xs text-red-600 mt-2'
                    id='password-error'
                  >
                    8+ characters required
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm mb-2'
                  >
                    Name
                  </label>
                  <div className='relative'>
                    <Input
                      type='name'
                      id='name'
                      name='name'
                      className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                      required
                      aria-describedby='password-error'
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className='hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                      <svg
                        className='h-5 w-5 text-red-500'
                        width='16'
                        height='16'
                        fill='currentColor'
                        viewBox='0 0 16 16'
                        aria-hidden='true'
                      >
                        <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
                      </svg>
                    </div>
                  </div>
                  <p
                    className='hidden text-xs text-red-600 mt-2'
                    id='password-error'
                  >
                    8+ characters required
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='password'
                    className='block text-sm mb-2'
                  >
                    Password
                  </label>
                  <div className='relative'>
                    <Input
                      type='password'
                      id='password'
                      name='password'
                      className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                      required
                      aria-describedby='password-error'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                      <svg
                        className='h-5 w-5 text-red-500'
                        width='16'
                        height='16'
                        fill='currentColor'
                        viewBox='0 0 16 16'
                        aria-hidden='true'
                      >
                        <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
                      </svg>
                    </div>
                  </div>
                  <p
                    className='hidden text-xs text-red-600 mt-2'
                    id='password-error'
                  >
                    8+ characters required
                  </p>
                </div>

                <div>
                  <label
                    htmlFor='confirm-password'
                    className='block text-sm mb-2'
                  >
                    Confirm Password
                  </label>
                  <div className='relative'>
                    <Input
                      type='password'
                      id='confirm-password'
                      name='confirm-password'
                      className='py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                      required
                      aria-describedby='confirm-password-error'
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className='hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                      <svg
                        className='h-5 w-5 text-red-500'
                        width='16'
                        height='16'
                        fill='currentColor'
                        viewBox='0 0 16 16'
                        aria-hidden='true'
                      >
                        <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
                      </svg>
                    </div>
                  </div>
                  <p
                    className='hidden text-xs text-red-600 mt-2'
                    id='confirm-password-error'
                  >
                    Passwords do not match
                  </p>
                </div>

                <button
                  type='submit'
                  className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
