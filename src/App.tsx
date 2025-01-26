import { useState } from "react";
import "./App.scss";
import { UserData } from "./types/types";
import { PostStatus } from "./components/PostStatus";
import { NewsFeed } from "./components/NewsFeed";
import { AppContext } from "./AppContext";

function App() {
  const [user, setUser] = useState<UserData>({
    id: "1",
    username: "martha",
    postsIdArr: ["100", "4196f4d4-8f67-44d1-a5c7-f2ee586e2735"],
    commentsIdArr: [],
  });

  const updateUserData = (userData: UserData) => {
    setUser(userData);
  };

  return (
    <AppContext.Provider value={{ user, updateUserData }}>
      <h1>My Community App</h1>
      <PostStatus />
      <NewsFeed />
    </AppContext.Provider>
  );
}

export default App;
