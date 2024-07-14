import React, { useEffect, useState } from "react";
import { postRequest } from "../../apiHandler/apiHandler";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const { user, updateUser } = useAuth();
	const navigate = useNavigate();

	const handleChange = (name, value) => {
		setError("");
		setUserInfo((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSignUp = async () => {
		if (!userInfo.email?.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(userInfo.email)) {
			setError("Email is invalid!");
		} else if (userInfo.password?.trim()?.length < 6) {
			setError("Password length should be at least 6!");
		} else if (userInfo.name?.trim()?.length < 3) {
			setError("Name is required");
		} else if (userInfo.password?.trim() !== userInfo.confirmPassword?.trim()) {
			setError("Passwords did not match!");
		} else {
			// Signing Up the User
			let { name, email, password } = userInfo;
			console.log({ envUrl: import.meta.env.VITE_BASE_URL });
			let resp = await postRequest(`${import.meta.env.VITE_BASE_URL}/users/register`, { name, email, password });
			if (!resp.success) setError(resp.message);
			else {
				console.log("Registration successful");
				let { success, ...restData } = resp;
				updateUser(restData);
				navigate("/chat");
			}
		}
	};

	useEffect(() => {
		setIsLoading(false);
	}, []);

	if (user) navigate("/chat");
	if (isLoading) <>Loading...</>;

	return (
		<div className="flex flex-col gap-4 p-4 m-auto py-32 max-w-[600px]">
			<h2 className="text-2xl">Register</h2>
			<input
				type="text"
				name="name"
				placeholder="Name"
				value={userInfo.name}
				onChange={(e) => handleChange("name", e.target.value)}
				className="text-black px-2 hover:opacity-80 h-10 rounded-md"
			/>
			<input
				type="email"
				placeholder="Email"
				name="email"
				value={userInfo.email}
				onChange={(e) => handleChange("email", e.target.value)}
				className="text-black px-2 hover:opacity-80 h-10 rounded-md"
			/>
			<input
				type="password"
				placeholder="Password"
				name="password"
				value={userInfo.password}
				onChange={(e) => handleChange("password", e.target.value)}
				className="text-black px-2 hover:opacity-80 h-10 rounded-md"
			/>
			<input
				type="password"
				placeholder="Confirm Password"
				name="confirmPassword"
				value={userInfo.confirmPassword}
				onChange={(e) => handleChange("confirmPassword", e.target.value)}
				className="text-black px-2 hover:opacity-80 h-10 rounded-md"
			/>
			<button className="text-white bg-blue-800 hover:opacity-80 h-10 rounded-md" onClick={handleSignUp}>
				Register
			</button>
			{error && (
				<div className="h-10 flex px-2 items-center bg-pink-200 text-black rounded-md">
					<p>{error}</p>
				</div>
			)}
		</div>
	);
};

export default SignUp;
