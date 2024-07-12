import { createBrowserRouter, Outlet } from "react-router-dom";
import SigIn from "./pages/signin/SigIn";
import SignUp from "./pages/signup/SignUp";
import Header from "./components/Header/Header";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "sign-in",
				element: <SigIn />,
			},
			{
				path: "register",
				element: <SignUp />,
			},
		],
	},
]);
function App() {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
}

export default router;
