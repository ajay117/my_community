interface PostStatusProps {
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const PostStatus: React.FC<PostStatusProps> = ({
  handleSubmit,
  handleChange,
}) => {
  return (
    <>
      <p>Write a Post</p>
      <form onSubmit={handleSubmit}>
        <textarea onChange={handleChange} rows={4} cols={30}></textarea>
        <button>Post</button>
      </form>
    </>
  );
};
