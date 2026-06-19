import express from "express";
import {
  login,
  logout,
  sign_up,
  updateProfile,
  checkAuth,
  call,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/sign_up", sign_up);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

router.get("/call", protectRoute, call);

export default router;
