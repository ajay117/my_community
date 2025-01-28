import { UserPost } from "../types/PostType";
import { NewsFeed } from "./NewsFeed";
import { PostStatus } from "./PostStatus";

export const Feeds = ({ posts }: { posts: UserPost[] }) => {
  return (
    <>
      <h1>My Community App</h1>
      <PostStatus />
      <NewsFeed posts={posts} />
    </>
  );
};
