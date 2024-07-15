"use client";
import { Material, UploadedMaterial } from "@/app/interfaces/material";
import { useEffect, useState } from "react";
import { Button, Input, Link, Textarea, useToast } from "@chakra-ui/react";
import { Select, SingleValue } from "chakra-react-select";
import { Categories, Category } from "@/app/interfaces/category";
import useSWR from "swr";
import { Tag, Tags } from "@/app/interfaces/tag";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

async function uploadFile(
  file: File | null,
  onUploaded: (result: UploadedMaterial) => void,
  onError: () => void
) {
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file, file.name);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload-file/`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      res.json().then((data) => onUploaded(data.data as UploadedMaterial));
    } else {
      onError();
    }
  } catch (error) {
    onError();
  }
}

async function createMaterial(
  accessToken: string,
  body: {
    title: string;
    description: string;
    content: string;
    categories: number[];
    tags: number[];
  },
  onError: () => void
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${apiUrl}/material/`, {
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

async function updateMaterial(
  accessToken: string,
  body: {
    id: number;
    title: string;
    description: string;
    content: string;
  },
  onError: () => void
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${apiUrl}/material/${body.id}/`, {
      method: "PUT",
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

export interface CreateMaterialProps {
  initialData?: {
    title: string;
    description: string;
    content: string;
    categories: Category[];
    tags: Tag[];
    id: number;
  };
  type: "create" | "update";
}

export default function CreateMaterial({
  initialData,
  type,
}: CreateMaterialProps) {
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>(initialData?.title ?? "");
  const [uploadedFile, setUploadedFile] = useState<string | null>(
    initialData?.content ?? null
  );
  const [description, setDescription] = useState<string>(
    initialData?.description ?? ""
  );
  const [selectedCategories, setSelectedCategories] = useState<
    { value: number; label: string }[]
  >(
    initialData?.categories?.map((category) => ({
      value: category.id,
      label: category.name,
    })) ?? []
  );
  const [selectedTags, setSelectedTags] = useState<
    { value: number; label: string }[]
  >(
    initialData?.tags?.map((tag) => ({ value: tag.id, label: tag.name })) ?? []
  );
  const [selectedMajor, setSelectedMajor] = useState<
    SingleValue<{ value: number; label: string }> | null
  >(null);
  const [selectedCourse, setSelectedCourse] = useState<
    SingleValue<{ value: number; label: string }> | null
  >(null);
  const [courses, setCourses] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    if (initialData) {
      setUploadedFile(initialData.content);
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const { data } = useSession();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const {
    data: majors,
    error: majorError,
    isLoading: isFetchingMajors,
  } = useSWR<Categories>(`${apiUrl}/category/?type=Major`);

  const {
    data: tags,
    error: tagError,
    isLoading: isFetchingTags,
  } = useSWR<Tags>(`${apiUrl}/tag/`);

  useEffect(() => {
    if (selectedMajor) {
      console.log(`${apiUrl}/category/?type=Course&major=${selectedMajor.value}`)
      fetch(`${apiUrl}/category/?type=Course&major=${selectedMajor.value}`)
        .then((res) => res.json())
        .then((data) => {
          setCourses(
            data.data.map((course: { id: number; name: string }) => ({
              value: course.id,
              label: course.name,
            }))
          );
        })
        .catch((error) => console.error("Failed to fetch courses", error));
    } else {
      setCourses([]);
      setSelectedCourse(null);
    }
  }, [selectedMajor]);

  useEffect(() => {
    if (selectedMajor && selectedCourse) {
      setSelectedCategories([
        { value: selectedMajor.value, label: selectedMajor.label },
        { value: selectedCourse.value, label: selectedCourse.label },
      ]);
    }
  }, [selectedMajor, selectedCourse]);


  if (isFetchingMajors || isFetchingTags) return "Loading ...";
  if (majorError || tagError) {
    return (
      <div className="col-span-3 md:col-span-6 lg:col-span-12 flex flex-col items-center gap-4">
        <div className="py-10 lg:pt-32 flex flex-col items-center gap-4">
          <h2 className="text-center text-gray-300 text-5xl md:text-7xl font-extrabold">
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
    <div className="flex flex-col pt-10 items-center">
      <div className="text-2xl font-semibold mb-4">
        Upload any material you want to share with the world ❤️
      </div>

      <div className="text-s pt-2 font-semibold mb-4 text-gray-500">
        Make sure to click the upload file button before submitting your material
      </div>

      <div className="mt-4 flex items-center gap-4">
        <input
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              setFile(event.target.files[0]);
            }
          }}
          type="file"
        />
        <Button
          onClick={async () => {
            setIsLoading(true);
            await uploadFile(
              file,
              (result) => {
                setUploadedFile(result.fileUrl);
              },
              () => {
                toast({
                  title: "File upload failed",
                  description:
                    "File extension is not allowed or size is too large",
                  duration: 4000,
                  status: "error",
                  isClosable: true,
                });
              }
            );
            setIsLoading(false);
          }}
          colorScheme="blue"
          isLoading={isLoading}
        >
          Upload
        </Button>
      </div>

      {uploadedFile && (
        <button
          onClick={(event) => {
            event.preventDefault();
            navigator.clipboard.writeText(uploadedFile);
            toast({
              title: "Copied file link to clipboard",
              description: "Go ahead and see if this is the file you uploaded",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          }}
          className="text-center px-5 py-2 bg-gray-200 rounded-3xl flex flex-col items-center mt-5"
        >
          <div className="font-semibold overflow-hidden text-ellipsis max-w-[800px] whitespace-nowrap">
            {uploadedFile}
          </div>
        </button>
      )}
      <div className="w-1/2 mt-4 flex flex-col">
        <div className="font-semibold text-xl">Title</div>
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          colorScheme="blue"
        />
      </div>
      <div className="mt-4 w-1/2 flex flex-col">
        <div className="text-xl font-semibold mb-3">
          Describe what you are uploading
        </div>
        <Textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          size={"md"}
          placeholder="Material Description"
        />
      </div>
      {type === "create" && (
        <div className="mt-4 w-1/2 flex flex-col">
          <div className="font-semibold text-xl mb-3">Select the major</div>
          <Select
            options={
              majors
                ? majors.data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))
                : []
            }
            onChange={(newValue) => {
              setSelectedMajor(newValue);
            }}
            value={selectedMajor}
            placeholder="Select the major of the material you are uploading"
          />
        </div>
      )}
      {type === "create" && selectedMajor && (
          <div className="mt-4 w-1/2 flex flex-col">
            <div className="font-semibold text-xl mb-3">Select the course</div>
            <Select
              options={courses}
              onChange={(newValue) => setSelectedCourse(newValue)}
              value={selectedCourse}
              placeholder="Select the course of the material you are uploading"
            />
            <div className="mt-2 mx-5 text-s text-gray-500">don't see the course you're looking for? Add it right{" "}       
              <Link href="/categories/course/add" className="text-blue-600 hover:underline">
                  <span className="text-blue-600">here</span>
              </Link>
            </div>
          </div>

      )}
      {type === "create" && !selectedMajor && (
        <div className="mt-4 w-1/2 flex flex-col">
          <div className="font-semibold text-xl mb-3">Select the course</div>
          <div className="bg-gray-100 p-2 rounded-md">
            <div className="text-red-500">Select the major first!</div>
          </div>        
        </div>
      )}
      {type === "create" && (
        <div className="mt-4 w-1/2 flex flex-col">
          <div className="font-semibold text-xl mb-3">Select the tags</div>
          <Select
            options={
              tags
                ? tags.data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))
                : []
            }
            onChange={(newValue) => setSelectedTags([...newValue])}
            value={selectedTags}
            placeholder="Select the tags of the material you are uploading"
            isMulti
          />
        </div>
      )}
      <Button
        onClick={async () => {
          if (type === "create") {
            if (!uploadedFile) {
              toast({
                status: "error",
                duration: 4000,
                title: "Upload File First!",
                description: "Please click the upload button after you select the file",
                isClosable: true,
              });
            }

            const material = await createMaterial(
              data?.accessToken ?? "",
              {
                title,
                description,
                content: uploadedFile ?? "",
                categories: selectedCategories.map(({ value }) => value),
                tags: selectedTags.map(({ value }) => value),
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
            if (material?.slug) {
              router.push(`/resources/material/${material?.slug}`);
            }
          } else if (type === "update") {
            if (!initialData?.id) return;
            const material = await updateMaterial(
              data?.accessToken ?? "",
              {
                id: initialData.id,
                title,
                description,
                content: uploadedFile ?? "",
              },
              () => {
                toast({
                  status: "error",
                  duration: 4000,
                  title: "Unable to update material",
                  description: "Please try again",
                  isClosable: true,
                });
              }
            );
            if (material?.slug) {
              router.push(`/resources/material/${material.slug}`);
            }
          }
        }}
        colorScheme="purple"
        className="mt-10 w-60"
      >
        {type === "create" ? "Submit" : "Update"}
      </Button>
    </div>
  );
}
