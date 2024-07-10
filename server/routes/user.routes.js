import express from "express";
import { loginUser, registerUser, findUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/:userId", findUser);

router.get("/", async (req, res, next) => {
	res.send("All user routes");
});

export default router;
