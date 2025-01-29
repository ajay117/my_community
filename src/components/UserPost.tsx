import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { UserPost as UserPostInterface } from "../types/PostType";
import { UserData } from "../types/UserType";
import { getUserData, updateUserData } from "../services/UserService";
import { CommentBox } from "./CommentBox";
import { postComment } from "../services/CommentService";
import { getUserPostById, updateUserPost } from "../services/PostService";
import { AppContext } from "../AppContext";
import { Comment } from "./Comment";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface UserPostProps {
  postData: UserPostInterface;
}

export const UserPost = ({ postData }: UserPostProps) => {
  const [postCreator, setPostCreator] = useState<UserData | null>(null);
  const { userId, post, id: postId, timestamp, commentsIdArr } = postData;
  const postDate = format(timestamp, "dd LLL yyyy ");
  const postTime = format(timestamp, "hh ':' mm aa");
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within its provider");
  }
  const { user: loggedInUserData, updatePosts } = context;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const postCreator = await getUserData(userId);
        if (postCreator) {
          setPostCreator(postCreator);
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!loggedInUserData) {
      throw new Error("User is not authenticated");
    }

    const newComment = {
      userId: loggedInUserData.id,
      comment: comment,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    setComment("");
    // - The comment should be sumitted with its required infos in "comment" collection.
    // - The comment Id should be saved in "commentsIdArr" in the respected post.
    // - The comment Id should also be saved in the respected postCreator's "commentsIdArr" in the users collection.

    const savedComment = await postComment(newComment);

    const commentedpost = await getUserPostById(postId);
    commentedpost.commentsIdArr.push(savedComment.id);
    const updatedPost = await updateUserPost(commentedpost.id, commentedpost);
    updatePosts(updatedPost);

    const loggedInUserDataCopy = { ...loggedInUserData };
    loggedInUserDataCopy.commentsIdArr.push(savedComment.id);
    updateUserData(loggedInUserData.id, loggedInUserDataCopy);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleCommentBtnClick = () => {
    setShowComments(true);
  };

  // console.log({ postData });

  const renderComments = postData.commentsIdArr.map((commentId) => {
    return <Comment key={commentId} commentId={commentId} />;
  });
  return (
    <div className="post">
      <div className="flex gap-1">
        <Typography className="post-creator" variant="h6" gutterBottom>
          {postCreator?.username}
        </Typography>

        <div className="text-secondary fw-500 text-small">
          <p className="m-0">Posted</p>

          <div className="m-0">
            <span>{postDate}</span>
            <span className="mx-1">{postTime}</span>
          </div>
        </div>
      </div>

      <div>
        <p>{post}</p>
      </div>

      {!showComments && commentsIdArr.length > 0 ? (
        <div className="text-right">
          <Button
            sx={{ textDecoration: "underline" }}
            onClick={handleCommentBtnClick}
            variant="text"
          >
            {commentsIdArr.length}{" "}
            {commentsIdArr.length === 1 ? "comment" : "comments"}
          </Button>
        </div>
      ) : (
        <section className="ps-2">
          <div className="comment-container">{renderComments}</div>
        </section>
      )}

      <CommentBox
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        comment={comment}
      />
    </div>
  );
};
