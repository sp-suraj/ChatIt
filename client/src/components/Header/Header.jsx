import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
	const { user, logOutUser } = useAuth();
	const navigate = useNavigate();

	const logoutHandler = () => {
		logOutUser();
		navigate("/");
	};

	return (
		<div className="flex p-8 justify-between bg-zinc-700 md:px-16 lg:px-48">
			<div className="md:w-1/2">
				<Link to={"/"}>ChatIt</Link>
			</div>
			{user ? (
				<div className="md:w-1/2 flex justify-end gap-6 md:gap-12">
					<Link to={"/profile"} className="hover:opacity-80">
						{user.name}
					</Link>
					<button onClick={logoutHandler} className="hover:opacity-80">
						Logout
					</button>
				</div>
			) : (
				<div className="md:w-1/2 flex justify-end gap-6 md:gap-12">
					<Link to={"/sign-in"} className="hover:opacity-80">
						Sign In
					</Link>
					<Link to={"/register"} className="hover:opacity-80">
						Register
					</Link>
				</div>
			)}
		</div>
	);
};

export default Header;
