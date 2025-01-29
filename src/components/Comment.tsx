import { useEffect, useState } from "react";
import {
  getCommentById,
  getCommentorByUserID,
} from "../services/CommentService";
import { Comment as CommentInterface } from "../types/CommentType";
import { UserData } from "../types/UserType";
import { ReplyBox } from "./ReplyBox";
import { Reply } from "./Reply";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export const Comment = ({ commentId }: { commentId: string }) => {
  const [comment, setComment] = useState<CommentInterface | null>(null);
  const [commentor, setCommentor] = useState<UserData | null>(null);
  const [isRepliesVisible, setIsRepliesVisible] = useState(false);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const data = await getCommentById(commentId);
        setComment(data);
      } catch (error) {
        console.error("Failed to fetch comment:", error);
      }
    };

    fetchComment();
  }, [commentId]);

  useEffect(() => {
    if (comment && !commentor) {
      const fetchCommentor = async (commentorId: string) => {
        try {
          const data = await getCommentorByUserID(commentorId);
          setCommentor(data);
        } catch (error) {
          console.error("Failed to fetch comment:", error);
        }
      };

      fetchCommentor(comment.userId);
    }
  }, [comment, commentor]);

  const toggleRepliesVisibility = () => {
    setIsRepliesVisible(!isRepliesVisible);
  };

  const updateComment = (updaetdComment: CommentInterface) => {
    setComment(updaetdComment);
  };

  const renderReplies = comment?.replies?.map((reply) => (
    <Reply key={reply.id} data={reply} />
  ));

  if (comment) {
    console.log(commentId, comment.comment);
  }

  return (
    <div>
      {comment ? (
        <div className="box my-1">
          <div className="flex gap-1">
            <p className="fw-600 mb-0">{commentor?.username}</p>
            <p className="text-secondary text-underline fw-500 mb-0">
              commented
            </p>
          </div>
          <p className="mb-05">{comment.comment}</p>
          <div className="">
            {comment.replies?.length > 0 && (
              <div className="flex">
                {!isRepliesVisible ? (
                  <div>
                    <Button
                      sx={{ textDecoration: "underline" }}
                      onClick={toggleRepliesVisibility}
                      className="py-0 mr-1"
                      variant="text"
                    >
                      See replies
                    </Button>
                  </div>
                ) : (
                  <div className="ps-2">
                    {renderReplies}
                    <Button
                      sx={{ textDecoration: "underline" }}
                      onClick={toggleRepliesVisibility}
                      className="py-0"
                      variant="text"
                    >
                      Hide replies
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <ReplyBox commentId={comment.id} updateComment={updateComment} />

          <Divider sx={{ borderWidth: "1px", margin: "20px 0" }} />
        </div>
      ) : (
        <p>Loading comment...</p>
      )}
    </div>
  );
};
