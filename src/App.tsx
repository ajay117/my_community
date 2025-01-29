import { useState, useEffect } from "react";
import "./App.scss";
import { UserData } from "./types/UserType";
import { UserPost as UserPostInterface } from "./types/PostType";
import { AppContext } from "./AppContext";
import { getAllPosts } from "./services/PostService";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Feeds } from "./components/Feeds";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<UserPostInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !user &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      navigate("/login");
    }
  }, [user, location.pathname, navigate]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      getAllPosts()
        .then((response) => {
          if (response) {
            setPosts(response);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch posts:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const updateUserData = (userData: UserData | null) => {
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
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            index
            element={
              user ? (
                loading ? (
                  <p>Loading...</p>
                ) : (
                  <Feeds posts={posts} />
                )
              ) : (
                <p>Please log in to see your feed.</p>
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
