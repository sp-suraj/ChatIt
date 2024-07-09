import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server is listening at port ${port}`));

mongoose
	.connect(process.env.ATLAS_URI)
	.then(() => console.log("Conneted to mongodb"))
	.catch((err) => console.log(err));
