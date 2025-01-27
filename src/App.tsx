import { useState, useEffect } from "react";
import "./App.scss";
import { UserData } from "./types/UserType";
import { UserPost as UserPostInterface } from "./types/PostType";
import { PostStatus } from "./components/PostStatus";
import { NewsFeed } from "./components/NewsFeed";
import { AppContext } from "./AppContext";
import { getAllPosts } from "./services/PostService";

function App() {
  const [user, setUser] = useState<UserData>({
    id: "1",
    username: "martha",
    postsIdArr: ["100", "4196f4d4-8f67-44d1-a5c7-f2ee586e2735"],
    commentsIdArr: [],
  });
  const [posts, setPosts] = useState<UserPostInterface[]>([]);

  useEffect(() => {
    getAllPosts().then((response) => {
      if (response) {
        setPosts(response);
      }
    });
  }, []);

  const updateUserData = (userData: UserData) => {
    setUser(userData);
  };

  const updatePosts = (post: UserPostInterface) => {
    setPosts((oldUserPosts) => [...oldUserPosts, post]);
  };

  return (
    <AppContext.Provider value={{ user, updateUserData }}>
      <h1>My Community App</h1>
      <PostStatus updatePosts={updatePosts} />
      <NewsFeed posts={posts} />
    </AppContext.Provider>
  );
}

export default App;
