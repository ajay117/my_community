import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { hashPassword } from "../utilities/utility";
import { createNewUser } from "../services/UserService";
import { BrandIntro } from "./BrandIntro";
import { AppContext } from "../AppContext";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const context = useContext(AppContext);

  if (!context) {
    return <p>Error: User context is not available.</p>; // Fallback UI
  }

  const { updateUserData } = context;

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setError(null); // Reset error state

    try {
      const hashedPassword = await hashPassword(password);
      const newUser = {
        username: username,
        password: hashedPassword,
        postsIdArr: [],
        commentsIdArr: [],
      };

      const createdUser = await createNewUser(newUser);
      console.log({ createdUser });
      if (!createdUser) {
        setError("Username already exists. Please choose a different one.");
      } else {
        // Successfully authenticated
        updateUserData(createdUser); // Update user data in the context
        localStorage.setItem("credentials", JSON.stringify(createdUser));
        navigate("/"); // Redirect to the home page
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="flex flex-col justify-content-center align-items-center full-height">
      <BrandIntro />

      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChangeUsername}
          fullWidth
          id="outlined-basic"
          data-testid="username"
          label="User Name"
          variant="outlined"
          margin="normal"
          value={username}
        />
        <TextField
          onChange={handleChangePassword}
          fullWidth
          id="outlined-password-input"
          data-testid="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          margin="normal"
        />
        <Button type="submit" fullWidth size="large" variant="contained">
          Sign Up
        </Button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      <p className="text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};
