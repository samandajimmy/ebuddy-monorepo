import express from "express";
import { updateUser, fetchUser, createUser, userActivity, fetchPotentialUsers, updateUsers } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/update-user-data", authMiddleware, updateUser);
router.get("/fetch-user-data", authMiddleware, fetchUser);
router.post("/create-user-data", authMiddleware, createUser);
router.post("/update-activity", authMiddleware, userActivity);
router.get("/get-potential-users", authMiddleware, fetchPotentialUsers);
router.post("/update-users", authMiddleware, updateUsers);

export default router;
