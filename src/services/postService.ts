import axios from "axios";
import { UserPost } from "../types/types";

const baseUrl = "http://localhost:3000";
const headers = {
  "Content-Type": "application/json",
};

export const getUserPostById = async (postId: string) => {
  try {
    const { data } = await axios.get<UserPost>(`${baseUrl}/posts/${postId}`);
    return data;
  } catch (error) {
    console.error("Error occurred while getting post : ", error);
    throw error;
  }
};

export const updateUserPost = async (postId: string, postData: UserPost) => {
  try {
    const { data } = await axios.put(`${baseUrl}/posts/${postId}`, postData, {
      headers,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
