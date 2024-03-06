import { BlogType } from "@/types";

import { Button } from "@/components/ui/button";
import { useDeleteBlog } from "@/lib/react-query/quries";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BlogHandler } from "./BlogHandler";

export interface BlogCardProps {
  blog: BlogType;
}

export function BlogCard(props: BlogCardProps) {
  const { blog } = props;

  const { mutateAsync: deleteBlog, isSuccess } = useDeleteBlog();

  const cache = useQueryClient();
  

  return (
    <>
      <div
        key={blog._id}
        className="w-full rounded  shadow-sm shadow-stone-400 p-4  items-center"
      >
        <h1 className="font-bold text-lg">{blog.title}</h1>
        <p className="text-md">{blog.content}</p>
        <div className="flex justify-end gap-4">
          <div>
            <Button
              onClick={() => {
                deleteBlog(blog._id);
          
                  cache.invalidateQueries({
                    queryKey: ["getBlogs"],
                  });
                
              }}
              size={"sm"}
              className="bg-red-500 text-white"
            >
              Delete
            </Button>
          </div>
          <div>
            <BlogHandler blog={blog} type={'update'} />
          </div>
          <div>
            <Link to={`/blog/${blog._id}`}>
              <Button size="sm">View</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
