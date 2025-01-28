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

  const renderComments = postData.commentsIdArr.map((comment) => (
    <Comment key={comment} commentId={comment} />
  ));
  return (
    <div style={{ border: "1px solid black" }}>
      <div>
        <p>{postCreator?.username}</p>
        <div>
          <p>Posted</p>
          <p>
            <span>{postDate}</span>
            <span>{postTime}</span>
          </p>
        </div>
      </div>

      <div>
        <p>{post}</p>
      </div>

      {!showComments && commentsIdArr.length > 0 ? (
        <button
          onClick={handleCommentBtnClick}
          style={{ marginBottom: "20px" }}
        >
          {commentsIdArr.length}{" "}
          {commentsIdArr.length === 1 ? "comment" : "comments"}
        </button>
      ) : (
        <section>{renderComments}</section>
      )}

      <CommentBox
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        comment={comment}
      />
    </div>
  );
};
