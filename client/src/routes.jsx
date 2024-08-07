import App from "./App";

import { PATH } from "../enum";

import { Home, Login } from "./pages";

import { login } from "./services";

const routes = [
	{
		element: <App />,
		children: [
			{
				path: PATH.HOME,
				element: <Home />,
			},
			{
				path: PATH.LOGIN,
				element: <Login />,
				action: ({ request }) => login(request),
			},
		],
	},
];

export default routes;
