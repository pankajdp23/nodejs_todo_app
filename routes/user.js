import express from "express";
import { getByUserId, login, register, logout } from "../controller/user.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

// deleteByUserId, updateByUserId
const router = express.Router();

// router.post('/userId/:id', updateByUserId);

// router.delete('/userId/:id', deleteByUserId);

router.post("/new", register);

router.post("/login", login);

router.get("/me", isAuthenticatedUser, getByUserId);

router.get("/logout", logout);

export default router;
