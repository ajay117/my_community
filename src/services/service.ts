import axios from "axios";
import { NewPostData, UserData } from "../types/types";

const baseUrl = "http://localhost:3000";
const headers = {
  "Content-Type": "application/json",
};

// Save a new user post
export const saveUserPost = async (postData: NewPostData) => {
  try {
    // Save the post to the database
    const { data: savedPost } = await axios.post<NewPostData>(
      `${baseUrl}/posts`,
      postData,
      { headers }
    );
    console.log("Post saved:", savedPost);

    // Fetch the user data
    const userData = await getUserData(postData.userId);
    if (!userData) throw new Error("User data not found!");

    // Update the user's posts array
    userData.postsIdArr = userData.postsIdArr || [];
    userData.postsIdArr.push(savedPost.id);
    const updatedUser = await updateUserData(userData.id, userData);

    console.log("Updated user data:", updatedUser);

    // Return both the saved post and updated user data
    return { post: savedPost, updatedUser };
  } catch (error) {
    console.error("Error saving user post: ", error);
    throw error; // Rethrow for handling by the caller
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
