import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import {
  getUserData,
  updateUserData as updateUserDataService,
} from "../services/UserService";
import { saveUserPost } from "../services/PostService";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const PostStatus = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("User context is not provided");
  }

  const { user, updateUserData, updatePosts } = context;
  const [post, setPost] = useState("");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!user) {
      throw new Error("User is not authenticated");
    }

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
    <form onSubmit={handleSubmit} className="my-2">
      <TextField
        onChange={handleChange}
        fullWidth
        id="outlined-multiline-flexible"
        data-testid="textfield-post"
        label="Write a Post"
        multiline
        maxRows={4}
        value={post}
        margin="normal"
      />

      <div className="text-right">
        <Button type="submit" variant="contained">
          Submit Post
        </Button>
      </div>
    </form>
  );
};
