import express from "express";

const router = express.Router();

router.post("/register", async (req, res, next) => {
	res.send("Register");
});

router.get("/", async (req, res, next) => {
	res.send("All user routes");
});

export default router;
