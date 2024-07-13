import React, { useState } from "react";

const SigIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	return (
		<div className="flex flex-col gap-4 p-4 m-auto py-32 max-w-[600px]">
			<h2 className="text-2xl">Sign In</h2>
			<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-black px-2 hover:opacity-80 h-10 rounded-md" />
			<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-black px-2 hover:opacity-80 h-10 rounded-md" />
			<button className="text-white bg-blue-800 hover:opacity-80 h-10 rounded-md">Sign In</button>
			{error && (
				<div className="h-10 flex px-2 items-center bg-pink-200 text-black rounded-md">
					<p>{error}</p>
				</div>
			)}
		</div>
	);
};

export default SigIn;
