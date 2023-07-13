import { Router } from "express";
import { bookController } from "./book.controller.js";
import { createBodyValidator } from "./middlewares/create.middleware.js";
import { authMiddleware } from "../user/middlewares/auth.middleware.js";
import { removeParamsValidator } from "./middlewares/remove.middleware.js";

const router = Router();

router.post("/", authMiddleware, createBodyValidator, bookController.create);
router.delete(
  "/:id",
  authMiddleware,
  removeParamsValidator,
  bookController.remove
);

export default router;
