import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import {
  getUserData,
  saveUserPost,
  updateUserData as updateUserDataService,
} from "../services/service";
import { UserPost } from "../types/types";

interface PostStatusProp {
  updatePosts: (post: UserPost) => void;
}

export const PostStatus = ({ updatePosts }: PostStatusProp) => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("User context is not provided");
  }

  const { user, updateUserData } = context;
  const [post, setPost] = useState("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newPost = {
      userId: user.id,
      post: post,
      timestamp: new Date().toISOString(),
      commentsIdArr: [],
    };
    setPost("");

    // The post should be saved in the "Posts" collection.
    // And also the user collection's "postsIdArr" should be updated with the new saved posts id.
    const savedPost = await saveUserPost(newPost);
    updatePosts(savedPost);

    //  Fetch the user data
    const userData = await getUserData(newPost.userId);
    if (!userData) throw new Error("User data not found!");

    //     // Update the user's posts array
    userData.postsIdArr = userData.postsIdArr || [];
    userData.postsIdArr.push(savedPost.id);
    const updatedUserData = await updateUserDataService(userData.id, userData);

    if (updatedUserData) {
      updateUserData(updatedUserData);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(event.target.value);
  };
  return (
    <>
      <p>Write a Post</p>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleChange}
          rows={4}
          cols={30}
          value={post}
        ></textarea>
        <button>Post</button>
      </form>
    </>
  );
};
