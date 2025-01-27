import axios from "axios";
import { Comment, NewComment } from "../types/types";

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