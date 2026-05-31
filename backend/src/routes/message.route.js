import express from "express"
import { login, logout, sign_up,updateProfile,checkAuth} from "../controllers/auth.controller.js";
import {getUserforSlider,getMessages,sendMessage} from "../controllers/message.controller.js";
import protectRoute from "../middleware/auth.middleware.js"
const  router = express.Router();





// router.put("/update-profile",protectRoute,updateProfile);
// router.get("/check",protectRoute,checkAuth);
router.get("/users",protectRoute,getUserforSlider);
router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessage);

export default router;