import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null));

	const updateUser = (userData) => {
		localStorage.setItem("user", JSON.stringify(userData));
		setUser(userData);
	};

	const logOutUser = () => {
		localStorage.removeItem("user");
		setUser("");
	};

	return <AuthContext.Provider value={{ user, updateUser, logOutUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
