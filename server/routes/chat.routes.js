import express from "express";
import { allUserChats, createChat, findChat } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", createChat);
router.get("/:userId", allUserChats);
router.get("/find/:firstId/:secondId", findChat);

router.get("/", async (req, res, next) => {
	res.send("All user routes");
});

export default router;
