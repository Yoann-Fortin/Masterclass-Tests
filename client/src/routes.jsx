import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";

import login from "./services/authService";

const routes = [
	{
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
				action: ({ request }) => login(request),
			},
		],
	},
];

export default routes;