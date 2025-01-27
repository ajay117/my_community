import { createContext } from "react";
import { UserData } from "./types/UserType";
import { UserPost } from "./types/PostType";

interface AppContextType {
  user: UserData;
  updateUserData: (userData: UserData) => void;
  updatePosts: (post: UserPost) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
