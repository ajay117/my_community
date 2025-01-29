import { UserPost } from "../types/PostType";
import { NewsFeed } from "./NewsFeed";
import { PostStatus } from "./PostStatus";

export const Feeds = ({ posts }: { posts: UserPost[] }) => {
  return (
    <>
      <div className="container">
        <PostStatus />
        <NewsFeed posts={posts} />
      </div>
    </>
  );
};
