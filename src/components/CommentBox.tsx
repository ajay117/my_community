import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
        {/* <textarea
          onChange={handleChange}
          placeholder="Write a comment"
          value={comment}
        ></textarea> */}
        <TextField
          onChange={handleChange}
          fullWidth
          id="outlined-multiline-flexible"
          // label="Multiline"
          multiline
          maxRows={4}
          value={comment}
          placeholder="Write a comment"
          margin="normal"
        />

        <div className="text-right">
          <Button type="submit" variant="contained">
            Submit Post
          </Button>
        </div>
      </form>
    </section>
  );
};
