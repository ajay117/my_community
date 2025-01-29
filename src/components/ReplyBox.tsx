import { useContext, useState } from "react";
import {
  getCommentById,
  updateComment as updateCommentService,
} from "../services/CommentService";
import { AppContext } from "../AppContext";
import { v4 as uuid } from "uuid";
import { Comment } from "../types/CommentType";

interface ReplyBoxProps {
  handleClickCancel: () => void;
  commentId: string;
  updateComment: (updatedComment: Comment) => void;
}

export const ReplyBox = ({
  handleClickCancel,
  commentId,
  updateComment,
}: ReplyBoxProps) => {
  const [reply, setReply] = useState("");
  const context = useContext(AppContext);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(event.target.value);
  };

  if (!context) {
    return <p>Error: User context is not available.</p>; // Fallback UI
  }

  const { user: loggedInUser } = context;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!loggedInUser) {
      throw new Error("User is not authenticated");
    }

    const mainComment = await getCommentById(commentId);

    const userReplyData = {
      id: uuid(),
      userId: loggedInUser.id,
      content: reply,
      timestamp: new Date().toISOString(),
    };

    mainComment.replies.push(userReplyData);
    const updatedComment = await updateCommentService(commentId, mainComment);
    updateComment(updatedComment);

    setReply("");
    handleClickCancel(); // Close the reply box on submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        onChange={handleChange}
        value={reply}
        placeholder="Write a reply"
      ></textarea>
      <button type="submit">Reply</button>
      <button type="button" onClick={handleClickCancel}>
        Cancel
      </button>
    </form>
  );
};
