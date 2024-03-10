import { getPaginatedBlogs } from "@/api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BlogResponseType } from "@/types";
import { QueryClient, keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { BlogCard } from "../blogs/BlogCard";
import { BlogHandler } from "../blogs/BlogHandler";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
export interface PaginatedBlogsProps {}

export function PaginatedBlogs(props: PaginatedBlogsProps) {
  const {} = props;
  const location = useLocation()
  const { currentPage } = useParams()
  const navigate = useNavigate()
  const activePage = parseInt(currentPage)

  const { isPending, data, error, isError, isFetching,  isPlaceholderData } = useQuery<BlogResponseType>({
    queryKey: ["PaginatedBlogs", activePage],
    queryFn: () => getPaginatedBlogs({ limit: 3, page: activePage }),
    placeholderData: keepPreviousData
  });

  const blogs = data?.data;
  const pagination = data?.pagination;

  const prevPage = async () => {
    if (data?.pagination.first) return

    navigate(`/paginated/${activePage - 1}`)
  }

  const nextPage = async () => {
    if (data?.pagination.last) return

    navigate(`/paginated/${activePage + 1}`)
  }


  if (isPending)
    return (
      <div className="flex justify-center w-full  flex-col items-center  gap-7 mt-8">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center w-full  flex-col items-center  gap-7 mt-8 text-red-500">
        {error.message}
      </div>
    );

  return (
    <div className="max-w-md mx-auto">
      <div className="flex  w-full justify-end mt-4">
        <BlogHandler activePage={activePage} />
      </div>
      {blogs?.length === 0 ? (
        <div>Currently no blogs is Present</div>
      ) : (
        <div className="flex justify-center w-full  flex-col items-center  gap-7 mt-8">
          {isFetching ? <>
          <div className="w-full h-[46vh] flex justify-center items-center">
            Fetching...
          </div>
          </> : blogs
            ?.map((blog) => <BlogCard blog={blog} key={blog._id} activePage={activePage} />)
            .reverse()
            
            }
        </div>
      )}

      <Pagination className="mt-8">
        <PaginationContent>
          {!pagination?.first && (
            <PaginationItem>
              <PaginationPrevious onClick={() => prevPage()}
              />
            </PaginationItem>
          )}

          {Array.from({ length: pagination?.totalPages }, (_, k) => k + 1)?.map(
            (k) => (
              <PaginationItem>
                <PaginationLink 
                isActive={k===activePage}
                onClick={() => {
                  
            navigate(`/paginated/${k}`)

                }}
                >{k}</PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          {!pagination?.last && (
            <PaginationItem>
              <PaginationNext onClick={() => nextPage()}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
