import { BlogHandler } from "./BlogHandler";
import { BlogCard } from "./BlogCard";
import { useGetBlogs } from "@/lib/react-query/quries";
import { BlogType } from "@/types";
export interface BlogsProps {}

export function Blogs(props: BlogsProps) {
  const {} = props;

const {data: getBlogs, isLoading, isError, error} = useGetBlogs()

if (isLoading) return <div className="flex h-screen justify-center items-center text-xl font-bold">loading...</div>

if (isError) return <div className="flex h-screen justify-center items-center text-xl font-bold">
  Some Thing Went Wrong... ${error.message}
</div>

  return (
    <div className="max-w-md mx-auto">
      <div className="flex  w-full justify-end mt-4">
        <BlogHandler />
      </div>
      {getBlogs?.length === 0 ? (
        <div>Currently no blogs is Present</div>
      ) : (
        <div className="flex justify-center w-full  flex-col items-center  gap-7 mt-8">
          {getBlogs?.map((blog: BlogType) => (
            <BlogCard blog={blog} key={blog._id} />
          )).reverse()}
        </div>
      )}
    </div>
  );
}
