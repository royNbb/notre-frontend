"use client";

import CreateMaterial from "@/app/components/create-material";
import { api } from "@/app/configs/axios";
import { Material } from "@/app/interfaces/material";
import { User } from "@/app/interfaces/user";
import { getIdFromSlug } from "@/app/utils/get-id-from-slug";
import { Button, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

function deleteMaterial(id: number) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return fetch(`${apiUrl}/material/${id}/`, {
    method: "DELETE",
  });
}

export default function UpdateMaterial({
  params,
}: {
  params: { slug: string };
}) {
  const toast = useToast();
  const router = useRouter();
  const id = getIdFromSlug(params.slug);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const {
    data: material,
    isLoading: isFetchingMaterial,
    error,
  } = useSWR(`${apiUrl}/material/${id}/`);
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isFetchingUser, setIsFetchingUser] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      if (status == "authenticated") {
        const response = await api.get<User>(`${apiUrl}/users/me`, {
          headers: {
            Authorization: `JWT ${session?.accessToken}`,
          },
        });
        setUser(response.data);
      }
    } catch (err: any) {
      alert(JSON.stringify(err.response.data, null, 2));
    } finally {
      setIsFetchingUser(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchUser();
    }
  }, [session]);

  if (isFetchingMaterial || isFetchingUser) {
    return "Loading ...";
  }

  if (
    error ||
    status === "unauthenticated" ||
    (material.data as Material).owner.username !== user?.username
  ) {
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
    <div className="flex flex-col gap-4">
      <CreateMaterial
        initialData={{
          ...material.data,
        }}
        type="update"
      />
      <div className="flex justify-center">
        <Button
          onClick={() => {
            if (!id) return;
            deleteMaterial(id)
              .then(() => {
                toast({
                  title: "Successfully deleted material",
                  duration: 4000,
                  isClosable: true,
                  status: "success",
                });
                router.push(`/resources`);
              })
              .catch(() => {
                toast({
                  title: "Unable to delete material",
                  duration: 4000,
                  isClosable: true,
                  status: "success",
                });
              });
          }}
          colorScheme="red"
          className="w-60"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
