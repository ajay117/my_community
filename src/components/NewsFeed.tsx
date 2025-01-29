// import { useEffect, useState } from "react";
import { UserPost } from "./UserPost";
import { UserPost as UserPostInterface } from "../types/PostType";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export const NewsFeed = ({ posts }: { posts: UserPostInterface[] }) => {
  const renderPosts = posts.map((post) => (
    <UserPost key={post.id} postData={post} />
  ));

  return (
    <>
      {/* <h1>News Feeds</h1> */}
      <Typography
        variant="h1"
        sx={{ fontSize: "30px", fontWeight: "500", margin: "30px 0 5px" }}
      >
        Feeds
      </Typography>
      <Divider />
      <section style={{ marginTop: "25px" }}>{renderPosts}</section>
    </>
  );
};
