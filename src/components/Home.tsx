import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import { useContext } from "react";
import { AppContext } from "../AppContext";

export const Home = () => {
  const context = useContext(AppContext);

  if (!context) {
    return <p>Error: User context is not available.</p>; // Fallback UI
  }
  const { user } = context;
  return (
    <>
      {user && <Nav />}

      <Outlet />
    </>
  );
};
