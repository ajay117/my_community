import axios from "axios";
// import { Comment, NewComment } from "../types/types";
import { Comment, NewComment } from "../types/CommentType";
import { UserData } from "../types/UserType";

const baseUrl = "http://localhost:3000";
const headers = {
  "Content-Type": "application/json",
};

export const getCommentById = async (id: string): Promise<Comment> => {
  try {
    const { data } = await axios.get(`${baseUrl}/comments/${id}`);
    return data;
  } catch (error) {
    console.error("Error occurred while getting comment by id :", error);
    throw error;
  }
};

export const postComment = async (
  commentData: NewComment
): Promise<Comment> => {
  try {
    const { data } = await axios.post(`${baseUrl}/comments`, commentData, {
      headers,
    });
    return data;
  } catch (error) {
    console.error("A error occurred when posting comment: ", error);
    throw error;
  }
};

export const updateComment = async (
  id: string,
  changedData: Comment
): Promise<Comment> => {
  try {
    const { data } = await axios.put<Comment>(
      `${baseUrl}/comments/${id}`,
      changedData,
      {
        headers,
      }
    );
    return data;
  } catch (error) {
    console.error("Error occurred while updating comment : ", error);
    throw error;
  }
};

export const getCommentorByUserID = async (
  userId: string
): Promise<UserData> => {
  try {
    const { data } = await axios.get(`${baseUrl}/users/${userId}`);
    return data;
  } catch (error) {
    console.error("Error occurred while getting comment by id :", error);
    throw error;
  }
};
