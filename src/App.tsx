import { useState, useEffect } from "react";
import "./App.scss";
import { UserData } from "./types/UserType";
import { UserPost as UserPostInterface } from "./types/PostType";
// import { PostStatus } from "./components/PostStatus";
// import { NewsFeed } from "./components/NewsFeed";
import { AppContext } from "./AppContext";
import { getAllPosts } from "./services/PostService";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Feeds } from "./components/Feeds";
import { Home } from "./components/Home";
import { Login } from "./components/Login";

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
    setPosts((oldUserPosts) => {
      const postExists = oldUserPosts.some(
        (olderPost) => olderPost.id === post.id
      );
      if (postExists) {
        return oldUserPosts.map((olderPost) =>
          olderPost.id === post.id ? post : olderPost
        );
      }
      return [...oldUserPosts, post];
    });
  };

  return (
    <AppContext.Provider value={{ user, updateUserData, updatePosts }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Feeds posts={posts} />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
