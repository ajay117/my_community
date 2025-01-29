import TextField from "@mui/material/TextField";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { getAllUserData } from "../services/UserService";
import { hashPassword } from "../utilities/utility";
import { BrandIntro } from "./BrandIntro";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const context = useContext(AppContext);
  const navigate = useNavigate();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const hashedPassword = await hashPassword(password);

      // Get all users from the JSON database
      const users = await getAllUserData();

      // Check if a user with the given username and hashed password exists,
      //  only for development purposes
      const user = users?.find(
        (u) =>
          u.username.toLowerCase() === username.toLowerCase() &&
          u.password === hashedPassword
      );

      if (user) {
        // Successfully authenticated
        updateUserData(user); // Update user data in the context
        localStorage.setItem("credentials", JSON.stringify(user));
        navigate("/"); // Redirect to the home page
      } else {
        // Authentication failed
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
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
          LOGIN
        </Button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      <p className="text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </section>
  );
};
