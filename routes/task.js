import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import {
  deleteMyTask,
  getMyTask,
  newTask,
  updateMyTask,
} from "../controller/task.js";

const router = express.Router();

router.post("/new", isAuthenticatedUser, newTask);

router.get("/my", isAuthenticatedUser, getMyTask);

router
  .route("/:id")
  .put(isAuthenticatedUser, updateMyTask)
  .delete(isAuthenticatedUser, deleteMyTask);

export default router;
