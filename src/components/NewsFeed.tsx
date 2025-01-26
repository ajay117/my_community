// import { useEffect, useState } from "react";
import { UserPost } from "./UserPost";
import { UserPost as UserPostInterface } from "../types/types";
// import { getAllPosts } from "../services/service";

export const NewsFeed = ({ posts }: { posts: UserPostInterface[] }) => {
  const renderPosts = posts.map((post) => <UserPost postData={post} />);

  return (
    <>
      <h1>News Feeds</h1>
      <section>{renderPosts}</section>
    </>
  );
};
