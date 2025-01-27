import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { UserData, UserPost as UserPostInterface } from "../types/types";
import { getUserData, updateUserData } from "../services/service";
import { CommentBox } from "./CommentBox";
import { postComment } from "../services/comment";
import { getUserPostById, updateUserPost } from "../services/postService";
import { AppContext } from "../AppContext";

interface UserPostProps {
  postData: UserPostInterface;
}

export const UserPost = ({ postData }: UserPostProps) => {
  const [postCreator, setPostCreator] = useState<UserData | null>(null);
  const { userId, post, id: postId, timestamp, commentsIdArr } = postData;
  const postDate = format(timestamp, "dd LLL yyyy ");
  const postTime = format(timestamp, "hh ':' mm aa");
  const [comment, setComment] = useState("");
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within its provider");
  }
  const { user: loggedInUserData } = context;

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
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newComment = {
      userId: loggedInUserData.id,
      comment: comment,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    // - The comment should be sumitted with its required infos in "comment" collection.
    // - The comment Id should be saved in "commentsIdArr" in the respected post.
    // - The comment Id should also be saved in the respected postCreator's "commentsIdArr" in the users collection.

    const savedComment = await postComment(newComment);

    const commentedpost = await getUserPostById(postId);
    commentedpost.commentsIdArr.push(savedComment.id);

    await updateUserPost(commentedpost.id, commentedpost);

    const loggedInUserDataCopy = { ...loggedInUserData };
    loggedInUserDataCopy.commentsIdArr.push(savedComment.id);
    updateUserData(loggedInUserData.id, loggedInUserDataCopy);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  console.log({ postData });

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

      <button style={{ marginBottom: "20px" }}>
        {commentsIdArr.length}{" "}
        {commentsIdArr.length === 1 ? "comment" : "comments"}
      </button>

      <CommentBox
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        comment={comment}
      />
    </div>
  );
};
