import { createContext } from "react";
import { UserData } from "./types/UserType";
import { UserPost } from "./types/PostType";

interface AppContextType {
  user: UserData | null;
  updateUserData: (userData: UserData | null) => void;
  updatePosts: (post: UserPost) => void;
}

export const AppContext = createContext<AppContextType | null>(null);
