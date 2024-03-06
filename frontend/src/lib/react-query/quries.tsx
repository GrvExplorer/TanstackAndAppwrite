import { BlogType, BlogTypeCreate, BlogTypeUpdate } from "@/types";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../apis/api";
import { QUERY_KEYS } from "./queryKeys";

export function useGetBlogs() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_Blogs],
    queryFn: getBlogs,
  });
}


export function useCreateBlog() {
  return useMutation({
    mutationKey: [QUERY_KEYS.POST_Blog],
    mutationFn: (data: BlogTypeCreate) => {
      return createBlog(data) 
    },

  })
}

export function useDeleteBlog() {
  return useMutation({
    mutationKey: [QUERY_KEYS.DELETE_Blog_By_Id],
    mutationFn: (id: string) => {
      return deleteBlog(id) 
    },
    onSuccess: () => {

    }
  })
}

export function useUpdateBlog() {
  return useMutation({
    mutationKey: [QUERY_KEYS.PUT_Blog_By_Id],
    mutationFn: (data: BlogTypeUpdate) => {
      return updateBlog(data) 
    },
    onSuccess: () => {

    }
  })
}

