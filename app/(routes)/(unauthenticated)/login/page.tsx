"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input, FormControl, FormLabel, Spinner } from "@chakra-ui/react";
import React, { ChangeEvent, KeyboardEvent } from "react";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const toast = useToast();

  const { status } = useSession();

  if (status == "authenticated") {
    router.push("/");
  }

  const [inputUsername, setInputUsername] = React.useState("");
  const [inputPassword, setInputPassword] = React.useState("");
  const [isPressed, setIsPressed] = React.useState(false);

  const handleInputUsernameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputUsername(e.target.value);

  const handleInputPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputPassword(e.target.value);

  const handleLogin = async () => {
    setIsPressed(true);
    const data = {
      username: inputUsername,
      password: inputPassword,
    };
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (!result?.ok) {
      toast({
        title: "Login failed.",
        status: "error",
        duration: 2000,
        position: "top",
      });
    } else {
      toast({
        title: "Login successful!",
        status: "success",
        duration: 2000,
        position: "top",
      });
    }
    setIsPressed(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-sm mt-48 bg-white border border-gray-200 rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-700 mx-auto'
    >
      <div className='p-4 sm:p-7'>
        <div className='text-center'>
          <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>
            Sign in
          </h1>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
            Don't have an account yet?{" "}
            <Link
              className='text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              href='/register'
            >
              Sign up here
            </Link>
          </p>
        </div>

        <div className='mt-5 flex flex-col gap-4'>
          <div className='py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600'>
            Or
          </div>

          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              value={inputUsername}
              onChange={handleInputUsernameChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              value={inputPassword}
              onChange={handleInputPasswordChange}
            />
          </FormControl>

          <button
            type="submit"
            className='w-full h-12 mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
          >
            {!isPressed ? "Sign in" : <Spinner size='sm' />}
          </button>
        </div>
      </div>
    </form>
  );
}
