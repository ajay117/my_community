import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import { UserData, UserPost as UserPostInterface } from "../types/types";
import { getUserData } from "../services/service";

interface UserPostProps {
  postData: UserPostInterface;
}

export const UserPost: React.FC<UserPostProps> = ({ postData }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const { userId, post, timestamp } = postData;
  const postDate = format(timestamp, "dd LLL yyyy ");
  const postTime = format(timestamp, "hh ':' mm aa");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserData(userId);
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    fetchUserData();
  }, []);

  console.log({ postData });

  return (
    <div style={{ border: "1px solid black" }}>
      <div>
        <p>{user?.username}</p>
        <div>
          <p>Posted</p>
          <p>
            <span>{postDate}</span>
            <span>{postTime}</span>
          </p>
        </div>
      </div>

      <div>
        <p>{post}</p>
      </div>

      <div>
        <button>Comment</button>
      </div>
    </div>
  );
};
