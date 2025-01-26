import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { saveUserPost } from "../services/service";
import { v4 as uuid4 } from "uuid";
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

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newPost = {
      id: uuid4(),
      userId: user.id,
      post: post,
      timestamp: new Date().toISOString(),
      commentsIdArr: [],
    };
    setPost("");

    // The post should be saved in the "Posts" collection.
    // And also the user collection's "postsIdArr" should be updated with the new saved posts id.
    saveUserPost(newPost)
      .then(({ post, updatedUser }) => {
        updatePosts(post);
        if (updatedUser) {
          updateUserData(updatedUser);
        }
      })
      .catch((error) => {
        console.error("Error occurred while saving user's post :", error);
      });
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
