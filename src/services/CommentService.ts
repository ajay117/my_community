import axios from "axios";
// import { Comment, NewComment } from "../types/types";
import { Comment, NewComment } from "../types/CommentType";

const baseUrl = "http://localhost:3000";
const headers = {
  "Content-Type": "application/json",
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

export const getCommentById = async (id: string): Promise<Comment> => {
  try {
    const { data } = await axios.get(`${baseUrl}/comments/${id}`);
    return data;
  } catch (error) {
    console.error("Error occurred while getting comment by id :", error);
    throw error;
  }
};
