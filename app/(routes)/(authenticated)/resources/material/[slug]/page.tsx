import { Material } from "@/app/interfaces/material";
import { getIdFromSlug } from "@/app/utils/get-id-from-slug";
import ReportModal from "@/app/components/material-details";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/libs/auth";
import { Comment } from "@/app/interfaces/comment";
import CommentsList from "@/app/components/comment-list";

async function getData(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const id = getIdFromSlug(slug);

  const session = await getServerSession(authOptions);

  try {
    const res = await fetch(`${baseUrl}/material/${id}/`, {
      cache: "no-store",
      headers: {
        Authorization: `JWT ${session?.accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json().then((data) => data.data);
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
async function getComments(materialId: number): Promise<Comment[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(
      `${baseUrl}/comment/?is_by_owner=False&material=${materialId}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch comments");
    }

    return res.json().then((data) => data.data);
  } catch (error) {
    throw new Error("Failed to fetch comments");
  }
}

export default async function MaterialDetails({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const data: Material = await getData(params.slug);
    const commentsData: Comment[] = await getComments(data.id);

    return (
      <div>
        <ReportModal data={data} type={"material"} />
        {<CommentsList comments={commentsData} type={"comment"} />}
      </div>
    );
  } catch (error) {
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
}
