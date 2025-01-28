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
export const createNewUser = async (
  newUserData: NewUser
): Promise<UserData | null> => {
  try {
    // Check if a user with the same username already exists
    const existingUsers = await getAllUserData();
    const userExists = existingUsers?.some(
      (user) =>
        user.username.toLowerCase() === newUserData.username.toLowerCase()
    );

    if (userExists) {
      console.error("Error: User already exists");
      return null; // Return null if the user already exists
    }

    // Proceed to create the new user if it doesn't exist
    const { data } = await axios.post<UserData>(
      `${baseUrl}/users/`,
      newUserData,
      { headers }
    );
    return data;
  } catch (error) {
    console.error("Error creating new user: ", error);
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
