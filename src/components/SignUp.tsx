import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { hashPassword } from "../utilities/utility";
import { createNewUser } from "../services/UserService";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const hashedPassword = await hashPassword(password);
    const newUser = {
      username: username,
      password: hashedPassword,
      postsIdArr: [],
      commentsIdArr: [],
    };
    createNewUser(newUser);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChangeUsername}
          fullWidth
          id="outlined-basic"
          label="User Name"
          variant="outlined"
          margin="normal"
          value={username}
        />
        <TextField
          onChange={handleChangePassword}
          fullWidth
          id="outlined-password-input"
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

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};
