import { useEffect, useState } from "react";
import { Reply as ReplyType } from "../types/CommentType";
import { getUserData } from "../services/UserService";
import { UserData } from "../types/UserType";

export const Reply = ({ data }: { data: ReplyType }) => {
  const [repliedUser, setRepliedUser] = useState<UserData | null>(null);

  useEffect(() => {
    if (!repliedUser) {
      const fetchUserData = async (userId: string) => {
        const data = await getUserData(userId);
        setRepliedUser(data);
      };

      fetchUserData(data.userId);
    }
  }, [data, repliedUser]);
  console.log({ repliedUser });

  return (
    <div>
      <div className="flex gap-1">
        <p className="fw-600 mb-0">{repliedUser?.username}</p>
        <p className="text-secondary text-underline fw-500 mb-0">replied:</p>
      </div>

      <p>{data.content}</p>
    </div>
  );
};
