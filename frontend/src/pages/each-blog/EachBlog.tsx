import { Button } from "@/components/ui/button";
import { getBlog } from "@/lib/apis/api";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { useGetBlog } from "@/lib/react-query/quries";
import { BlogType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

export interface EachBlogProps {}

export function EachBlog(props: EachBlogProps) {
  const {} = props;
  const { id } = useParams();

  const { data: blog, isPending } = useQuery<BlogType>({
    queryKey: [QUERY_KEYS.GET_Blog_BY_ID, id],
    queryFn: () => getBlog(id),
  });


  return (
    <div className="flex items-center justify-center w-full h-screen bg-yellow-50">
      {isPending ? (
        "Loading..."
      ) : (
        <div className="flex flex-col gap-4">
          <div className="">
            <Link to="/">
              <Button>Back</Button>
            </Link>
          </div>

          <div className="rounded shadow-sm shadow-stone-400 p-9 min-w-80 items-center">
            <h1 className="font-bold text-lg">{blog?.title}</h1>
            <p className="text-md">{blog?.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
