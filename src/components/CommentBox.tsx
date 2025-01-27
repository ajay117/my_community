interface CommentBoxProps {
  handleSubmit: (event: React.SyntheticEvent) => void;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  comment: string;
}

export const CommentBox = ({
  handleSubmit,
  handleChange,
  comment,
}: CommentBoxProps) => {
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleChange}
          placeholder="Write a comment"
          value={comment}
        ></textarea>
        <button>Comment</button>
      </form>
    </section>
  );
};
