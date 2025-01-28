import axios from "axios";
import { UserPost, NewPostData } from "../types/PostType";

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

// Get all Posts
export const getAllPosts = async (): Promise<UserPost[] | null> => {
  try {
    const { data } = await axios.get<UserPost[]>(`${baseUrl}/posts`);
    return data;
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return null; // Return null if an error occurs
  }
};

// Save a new user post
export const saveUserPost = async (postData: NewPostData) => {
  try {
    // Save the post to the database
    const { data: savedPost } = await axios.post<UserPost>(
      `${baseUrl}/posts`,
      postData,
      {
        headers,
      }
    );
    return savedPost;
  } catch (error) {
    console.error("Error saving user post: ", error);
    throw error; // Rethrow for handling by the caller
  }
};
