import { createBrowserRouter, Outlet } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import SigIn from "./pages/signin/SigIn";
import SignUp from "./pages/signup/SignUp";
import Header from "./components/Header/Header";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "chat",
				element: <Chat />,
			},
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
		<div className="w-full h-screen text-white bg-zinc-600">
			<Header />
			<Outlet />
		</div>
	);
}

export default router;
