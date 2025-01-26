import { useState } from "react";
import "./App.scss";
import { v4 as uuid4 } from "uuid";

import { saveUserPost } from "./services/service";
import { UserData } from "./types/types";
import { PostStatus } from "./components/PostStatus";
import { NewsFeed } from "./components/NewsFeed";

function App() {
  const [user, setUser] = useState<UserData>({
    id: "1",
    username: "martha",
    postsIdArr: ["100", "4196f4d4-8f67-44d1-a5c7-f2ee586e2735"],
    commentsIdArr: [],
  });
  const [post, setPost] = useState("");

  const updateUserData = (userData: UserData) => {
    setUser(userData);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newPost = {
      id: uuid4(),
      userId: user.id,
      post: post,
      timestamp: new Date().toISOString(),
      commentsIdArr: [],
    };

    // The post should be saved in the "Posts" collection.
    // And also the user collection's "postsIdArr" should be updated with the new saved posts id.

    saveUserPost(newPost)
      .then(({ post, updatedUser }) => {
        console.log("Saved Post:", post);
        console.log("Updated User:", updatedUser);
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
      <h1>My Community App</h1>
      <PostStatus handleSubmit={handleSubmit} handleChange={handleChange} />
      <NewsFeed />
    </>
  );
}

export default App;
