"use client";
import { Material } from "@/app/interfaces/material";
import { useState } from "react";
import { Button, Input, useToast } from "@chakra-ui/react";
import { Select, SingleValue } from "chakra-react-select";
import { Categories } from "@/app/interfaces/category";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

async function createCourse(
  accessToken: string,
  body: {
    name: string;
    type: string;
    major: number;
  },
  onError: () => void
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${apiUrl}/category/`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `JWT ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      onError();
      return;
    }
    return res.json().then((data) => data.data as Material);
  } catch (error) {
    onError();
  }
  return undefined;
}

export default function CreateCourse() {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("Course");
  const [major, setMajor] = useState<
    SingleValue<{ value: number; label: string }> | null
  >(null);

  const { data } = useSession();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const {
    data: categories,
    error: categoryError,
    isLoading: isFetchingCategories,
  } = useSWR<Categories>(`${apiUrl}/category/?type=Major`);

  if (isFetchingCategories) return "Loading ...";
  if (categoryError) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="py-10 flex flex-col items-center gap-4">
          <h2 className="text-center text-gray-300 text-5xl font-extrabold">
            Shoot!
          </h2>
          <h2 className="text-center text-gray-600 text-lg">
            Something bad happened. Please try again later.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Create New Course</h1>

      <div className="w-full max-w-md">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Select the Major</label>
          <Select
            options={
              categories
                ? categories.data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))
                : []
            }
            onChange={(newValue) => setMajor(newValue)}
            value={major}
            placeholder="Select the major of this course"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Course Name</label>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            colorScheme="blue"
          />
        </div>

        <Button
          onClick={async () => {
            const course = await createCourse(
              data?.accessToken ?? "",
              {
                name,
                type,
                major: major?.value ?? 0,
              },
              () => {
                toast({
                  status: "error",
                  duration: 4000,
                  title: "Something went wrong",
                  description: "Please login first and fill all the fields",
                  isClosable: true,
                });
              }
            );
            if (course) {
              toast({
                status: "success",
                duration: 2000,
                title: "Success",
                description: "New course has been added",
                isClosable: true,
              });
              setTimeout(() => {
                router.push(`/resources/upload`);
              }, 2000);
            }
          }}
          colorScheme="purple"
          isLoading={isLoading}
          className="w-full"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
