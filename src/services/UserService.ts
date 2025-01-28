import axios from "axios";
import { NewUser, UserData } from "../types/UserType";

const baseUrl = "http://localhost:3000";
const headers = {
  "Content-Type": "application/json",
};

// Get all User's data
export const getAllUserData = async (): Promise<UserData[] | null> => {
  try {
    const { data } = await axios.get<UserData[]>(`${baseUrl}/users`);
    return data;
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return null; // Return null if an error occurs
  }
};

// Fetch user data by ID
export const getUserData = async (id: string): Promise<UserData | null> => {
  try {
    const { data } = await axios.get<UserData>(`${baseUrl}/users/${id}`);
    return data;
  } catch (error) {
    console.error("Error creating new user: ", error);
    return null; // Return null if an error occurs
  }
};

// Create a new user
export const createNewUser = async (newUserData: NewUser) => {
  try {
    const { data } = await axios.post<UserData>(
      `${baseUrl}/users/`,
      newUserData,
      { headers }
    );
    return data;
  } catch (error) {
    console.error("Error updating user data: ", error);
    return null; // Return null if an error occurs
  }
};

// Update user data
export const updateUserData = async (
  userId: string,
  updatedUserData: UserData
): Promise<UserData | null> => {
  try {
    const { data } = await axios.put<UserData>(
      `${baseUrl}/users/${userId}`,
      updatedUserData,
      { headers }
    );
    return data;
  } catch (error) {
    console.error("Error updating user data: ", error);
    return null; // Return null if an error occurs
  }
};
