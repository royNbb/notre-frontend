"use client";
import { Material, UploadedMaterial } from "@/app/interfaces/material";
import { useEffect, useState } from "react";
import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
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
  const [file, setfile] = useState<File | null>(null);
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
    data: categories,
    error: categoryError,
    isLoading: isFetchingCategories,
  } = useSWR<Categories>(`${apiUrl}/category/`);

  const {
    data: tags,
    error: tagError,
    isLoading: isFetchingTags,
  } = useSWR<Tags>(`${apiUrl}/tag/`);

  if (isFetchingCategories || isFetchingTags) return "Loading ...";
  if (categoryError || tagError) {
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

  return (
    <div className="flex flex-col pt-10 items-center">
      <div className="text-2xl font-semibold mb-4">
        Upload any material you want to share with the world ❤️
      </div>
      <div className="mt-4 flex items-center gap-4">
        <input
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              setfile(event.target.files[0]);
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
          <div className="font-semibold text-xl mb-3">Select the category</div>
          <Select
            options={
              categories
                ? categories.data.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))
                : []
            }
            onChange={(newValue) => setSelectedCategories([...newValue])}
            value={selectedCategories}
            placeholder="Select the category of the material you are uploading"
            isMulti
          />
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
                  description: "Please try again",
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
