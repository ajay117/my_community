import { useEffect, useState } from "react";
import { UserPost } from "./UserPost";
import { UserPost as UserPostInterface } from "../types/types";
import { getAllPosts } from "../services/service";

export const NewsFeed = () => {
  const [userPosts, setUserPosts] = useState<UserPostInterface[]>([]);

  useEffect(() => {
    getAllPosts().then((response) => {
      if (response) {
        setUserPosts(response);
      }
    });
  }, []);

  // console.log({ userPosts });

  const renderPosts = userPosts.map((post) => <UserPost postData={post} />);
  // }
  // const postData = {
  //   id: "100",
  //   userId: "1",
  //   post: "I love Nepal",
  //   timestamp: "2025-01-22T12:00:57.223Z",
  //   commentsIdArr: ["1000", "1001"],
  // };
  return (
    <>
      <h1>News Feeds</h1>
      <section>{renderPosts}</section>
    </>
  );
};
