import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBlog, getBlog, getBlogs } from "../apis/api";
import { QUERY_KEYS } from "./queryKeys";
import { BlogTypeCreate } from "@/types";

export function useGetBlogs() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_Blogs],
    queryFn: getBlogs,
  });
}

export function useGetBlog() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_Blog_BY_ID],
    queryFn: getBlog,
  });
}



export function useCreateBlog() {
  return useMutation({
    mutationFn: (data: BlogTypeCreate) => {
      return createBlog(data) 
    },

  })
}