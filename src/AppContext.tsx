import { createContext } from "react";
import { UserData } from "./types/types";

interface AppContextType {
  user: UserData;
  updateUserData: (userData: UserData) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
