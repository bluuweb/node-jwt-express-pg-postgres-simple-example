import express from "express";
import seedRouter from "./seed/seed.route.js";
import userRouter from "./user/user.route.js";
import bookRouter from "./book/book.route.js";

const app = express();

app.use(express.json());

app.use("/seed", seedRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);

export { app };
