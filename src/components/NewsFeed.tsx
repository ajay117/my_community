// import { useEffect, useState } from "react";
import { UserPost } from "./UserPost";
import { UserPost as UserPostInterface } from "../types/PostType";

export const NewsFeed = ({ posts }: { posts: UserPostInterface[] }) => {
  const renderPosts = posts.map((post) => (
    <UserPost key={post.id} postData={post} />
  ));

  return (
    <>
      <h1>News Feeds</h1>
      <section>{renderPosts}</section>
    </>
  );
};
