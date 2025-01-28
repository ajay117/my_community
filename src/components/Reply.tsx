import { Reply as ReplyType } from "../types/CommentType";
import { format } from "date-fns";

export const Reply = ({ data }: { data: ReplyType }) => {
  const postDate = format(data.timestamp, "dd LLL yyyy ");
  const postTime = format(data.timestamp, "hh ':' mm aa");
  return (
    <div>
      <p>{data.content}</p>
      <p>
        {postDate} {postTime}
      </p>
    </div>
  );
};
