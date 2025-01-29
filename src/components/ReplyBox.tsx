import { useContext, useState } from "react";
import {
  getCommentById,
  updateComment as updateCommentService,
} from "../services/CommentService";
import { AppContext } from "../AppContext";
import { v4 as uuid } from "uuid";
import { Comment } from "../types/CommentType";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface ReplyBoxProps {
  commentId: string;
  updateComment: (updatedComment: Comment) => void;
}

export const ReplyBox = ({ commentId, updateComment }: ReplyBoxProps) => {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        fullWidth
        id="outlined-multiline-flexible"
        multiline
        maxRows={4}
        value={reply}
        placeholder="Write a reply"
        margin="normal"
      />

      <div className="text-right">
        <Button className="mx-1" type="submit" variant="contained">
          Reply
        </Button>
      </div>
    </form>
  );
};
