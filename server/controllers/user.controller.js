import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
	let jwtKey = process.env.JWT_SECRET_KEY;
	let token = jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
	return token;
};

export const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		//Check if user already exists or not
		let user = await UserModel.findOne({ email });

		if (user) return res.status(400).json({ success: false, message: "Email already exists" });
		if (!email || !validator?.isEmail(email)) return res.status(400).json({ success: false, message: "Email is invalid" });
		if (!password || !validator?.isStrongPassword(password)) return res.status(400).json({ success: false, message: "Password is invalid" });
		if (!name) return res.status(400).json({ success: false, message: "Name is required" });

		user = new UserModel({ email, password, name });

		//Hash the password
		user.password = await bcrypt.hash(password, 10);

		//Save user
		await user.save();

		//Create newly signed token
		const token = createToken(user._id);
		res.status(201).json({ success: true, _id: user._id, name, token });
	} catch (error) {
		res.status(500).json(error);
	}
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		//Check if user already exists or not

		if (!email || !validator?.isEmail(email)) return res.status(400).json({ success: false, message: "Email is invalid" });
		if (!password) return res.status(400).json({ success: false, message: "Password is required" });

		let user = await UserModel.findOne({ email });
		if (!user) return res.status(400).json({ success: false, message: "No user found" });

		//Check the password
		let isCorrectPass = bcrypt.compare(password, user.password);
		if (!isCorrectPass) return res.status(400).json({ success: false, message: "Incorrect password" });

		const token = createToken(user._id);
		res.status(200).json({ success: true, _id: user._id, name: user.name, token });
	} catch (error) {
		res.status(500).json(error);
	}
};

export const findUser = async (req, res) => {
	let userId = req.params.userId;
	try {
		let user = await UserModel.findById(userId);
		if (!user) return res.status(400).json({ success: false, message: "No user found" });

		res.status(200).json({ success: true, ...user });
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getUsers = async (req, res) => {
	try {
		let users = await UserModel.find();

		res.status(200).json({ success: true, data: users });
	} catch (error) {
		res.status(500).json(error);
	}
};
