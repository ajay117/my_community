import { useEffect, useState } from "react";
import { getCommentById } from "../services/CommentService";
import { Comment as CommentInterface } from "../types/CommentType";

export const Comment = ({ commentId }: { commentId: string }) => {
  // console.log(commentId)
  const [comment, setComment] = useState<CommentInterface | null>(null);
  useEffect(() => {
    const fetchComment = async () => {
      const data = await getCommentById(commentId);
      console.log({ data });
      setComment(data);
    };

    fetchComment();
  }, [commentId]);

  return <>{comment ? <p>{comment.comment}</p> : null}</>;
};
