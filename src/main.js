import express from "express";
import seedRouter from "./seed/seed.route.js";
import userRouter from "./user/user.route.js";

const app = express();

app.use(express.json());

app.use("/seed", seedRouter);
app.use("/api/v1/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
