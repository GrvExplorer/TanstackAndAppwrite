import { BlogTypeCreate } from "@/types";
import axios from "axios";

const BASE_URL_SERVER = import.meta.env.VITE_BASE_URL_SERVER

export async function getBlogs() {
  try {
    const res = await axios.get(`${BASE_URL_SERVER}/api/blogs`)
    if (!res) throw new Error("error while getting your blogs. ");

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getBlog(id: string) {
  try {
    const res = await axios.get(`${BASE_URL_SERVER}/api/blogs/${id}`)
    if (!res) throw new Error("error while getting your blogs. ");

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createBlog(data:BlogTypeCreate) {
  try {
  const res = await axios.post(`${BASE_URL_SERVER}/api/blogs`, data)    
  if (!res) throw new Error("error while creating your blog. ");
  
  return res
  } catch (error) {
    console.log(error);
  }
}
