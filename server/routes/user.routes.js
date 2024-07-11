import express from "express";
import { loginUser, registerUser, findUser, getUsers } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", findUser);
router.get("/", getUsers);

router.get("/", async (req, res, next) => {
	res.send("All user routes");
});

export default router;
