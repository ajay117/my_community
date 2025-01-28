import { useEffect, useState } from "react";
import { getCommentById } from "../services/CommentService";
import { Comment as CommentInterface } from "../types/CommentType";
import { ReplyBox } from "./ReplyBox";
import { Reply } from "./Reply";

export const Comment = ({ commentId }: { commentId: string }) => {
  const [comment, setComment] = useState<CommentInterface | null>(null);
  const [isReplyBoxVisible, setIsReplyBoxVisible] = useState(false);
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

  const toggleReplyBox = () => {
    setIsReplyBoxVisible(!isReplyBoxVisible);
  };

  const toggleRepliesVisibility = () => {
    setIsRepliesVisible(!isRepliesVisible);
  };

  const updateComment = (updaetdComment: CommentInterface) => {
    setComment(updaetdComment);
  };

  const renderReplies = comment?.replies?.map((reply) => (
    <Reply key={reply.id} data={reply} />
  ));

  return (
    <div>
      {comment ? (
        <div>
          <p>{comment.comment}</p>
          {comment.replies?.length > 0 && (
            <div>
              {!isRepliesVisible ? (
                <p
                  onClick={toggleRepliesVisibility}
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  See replies...
                </p>
              ) : (
                <div>
                  {renderReplies}
                  <p
                    onClick={toggleRepliesVisibility}
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Hide replies
                  </p>
                </div>
              )}
            </div>
          )}
          {!isReplyBoxVisible && (
            <div>
              <button onClick={toggleReplyBox}>Reply</button>
            </div>
          )}
          {isReplyBoxVisible && (
            <ReplyBox
              commentId={comment.id}
              handleClickCancel={toggleReplyBox}
              updateComment={updateComment}
            />
          )}
        </div>
      ) : (
        <p>Loading comment...</p>
      )}
    </div>
  );
};
