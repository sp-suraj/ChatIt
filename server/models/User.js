import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 30,
		},
		email: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 100,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 4,
			maxlength: 100,
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = model("User", userSchema);

export default UserModel;
