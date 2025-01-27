import axios from "axios";
import { NewPostData, PostData, UserData, UserPost } from "../types/types";

const baseUrl = "http://localhost:3000";
const headers = {
  "Content-Type": "application/json",
};

// Get all User's data
export const getAllUserData = async (): Promise<UserData[] | null> => {
  try {
    const { data } = await axios.get<UserData[]>(`${baseUrl}/users`);
    return data;
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return null; // Return null if an error occurs
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

// Fetch user data by ID
export const getUserData = async (id: string): Promise<UserData | null> => {
  try {
    const { data } = await axios.get<UserData>(`${baseUrl}/users/${id}`);
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
    const { data: savedPost } = await axios.post<PostData>(
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

// Update user data
export const updateUserData = async (
  userId: string,
  updatedUserData: UserData
): Promise<UserData | null> => {
  try {
    const { data } = await axios.put<UserData>(
      `${baseUrl}/users/${userId}`,
      updatedUserData,
      { headers }
    );
    return data;
  } catch (error) {
    console.error("Error updating user data: ", error);
    return null; // Return null if an error occurs
  }
};
