import express from "express";
import { getMessage, createMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessage);

router.get("/", async (req, res, next) => {
	res.send("All messages routes");
});

export default router;
