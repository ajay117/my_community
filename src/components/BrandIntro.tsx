import { Typography } from "@mui/material";

export const BrandIntro = () => {
  return (
    <section className="text-center">
      <Typography sx={{ fontSize: "30px", fontWeight: "500" }} variant="h1">
        My Community
      </Typography>
      <p className="text-md">Connect with like minded people.</p>
    </section>
  );
};
