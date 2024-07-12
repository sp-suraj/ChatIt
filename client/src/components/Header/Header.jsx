import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="flex">
			<Link to={"/"}>Logo</Link>
			<Link to={"/sign-in"}>Sign In</Link>
			<Link to={"/register"}>Register</Link>
		</div>
	);
};

export default Header;
