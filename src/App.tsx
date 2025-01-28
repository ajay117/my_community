import { useState, useEffect } from "react";
import "./App.scss";
import { UserData } from "./types/UserType";
import { UserPost as UserPostInterface } from "./types/PostType";
// import { PostStatus } from "./components/PostStatus";
// import { NewsFeed } from "./components/NewsFeed";
import { AppContext } from "./AppContext";
import { getAllPosts } from "./services/PostService";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Feeds } from "./components/Feeds";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";

function App() {
  // const [user, setUser] = useState<UserData>({
  //   id: "1",
  //   username: "martha",
  //   postsIdArr: ["100", "4196f4d4-8f67-44d1-a5c7-f2ee586e2735"],
  //   commentsIdArr: [],
  // });
  const [user, setUser] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<UserPostInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state for posts
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  // Redirect to /login only if user is not logged in and not on /signup or /login
  useEffect(() => {
    if (
      !user &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      navigate("/login");
    }
  }, [user, location.pathname, navigate]);

  // Fetch all posts once user is logged in
  useEffect(() => {
    if (user) {
      setLoading(true); // Start loading
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
          setLoading(false); // Stop loading
        });
    }
  }, [user]);

  const updateUserData = (userData: UserData) => {
    setUser(userData);
    navigate("/");
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
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Home />}>
          {/* Show Feeds only if user is logged in */}
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
      {/* </BrowserRouter> */}
    </AppContext.Provider>
  );
}

export default App;
