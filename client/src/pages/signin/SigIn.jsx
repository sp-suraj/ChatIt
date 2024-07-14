import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { postRequest } from "../../apiHandler/apiHandler";
import { useNavigate } from "react-router-dom";

const SigIn = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const { user, updateUser } = useAuth();
	const navigate = useNavigate();

	const handleSignIn = async () => {
		if (!email?.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
			setError("Email is invalid!");
		} else if (password?.trim()?.length < 6) {
			setError("Password length should be at least 6!");
		} else {
			// Signing In the User
			let resp = await postRequest(`${import.meta.env.VITE_BASE_URL}/users/login`, { email, password });
			if (!resp.success) setError(resp.message);
			else {
				console.log("Login successful");
				let { success, ...restData } = resp;
				updateUser(restData);
				navigate("/chat");
			}
		}
	};

	useEffect(() => {
		if (user) {
			navigate("/chat");
		} else {
			setIsLoading(false);
		}
	}, [user, navigate]);

	if (isLoading) <>Loading...</>;

	return (
		<div className="flex flex-col gap-4 p-4 m-auto py-32 max-w-[600px]">
			<h2 className="text-2xl">Sign In</h2>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
					setError("");
				}}
				className="text-black px-2 hover:opacity-80 h-10 rounded-md"
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
					setError("");
				}}
				className="text-black px-2 hover:opacity-80 h-10 rounded-md"
			/>
			<button className="text-white bg-blue-800 hover:opacity-80 h-10 rounded-md" onClick={handleSignIn}>
				Sign In
			</button>
			{error && (
				<div className="h-10 flex px-2 items-center bg-pink-200 text-black rounded-md">
					<p>{error}</p>
				</div>
			)}
		</div>
	);
};

export default SigIn;
