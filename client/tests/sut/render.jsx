import {
	createMemoryRouter,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { render, waitFor } from "@testing-library/react";

import App from "../../src/App";

import { Home, Login } from "../../src/pages";

import routes from "../../src/routes";

import { PATH } from "../../enum";

const defaultRoutes = (loginAction) => [
	{
		element: <App />,
		children: [
			{ path: PATH.HOME, element: <Home /> },
			{ path: PATH.LOGIN, element: <Login />, action: loginAction },
		],
	},
];

export const givenTheComponent = (component, { route = PATH.HOME } = {}) => {
	const router = createMemoryRouter(
		[
			{
				path: "*",
				element: component,
			},
		],
		{
			initialEntries: [route],
		},
	);

	const renderResult = render(<RouterProvider router={router} />);

	return renderResult;
};

export const givenThePage = ({
	initialRoute = PATH.HOME,
	action = null,
} = {}) => {
	const testRoutes = defaultRoutes(action); // Assurez-vous que l'action est correctement passée ici
	const router = createMemoryRouter(testRoutes, {
		initialEntries: [initialRoute],
	});
	const renderResult = render(<RouterProvider router={router} />);
	return {
		...renderResult,
		router,
	};
};

export const renderPages = ({
	initialRoute = PATH.HOME,
	action = null,
} = {}) => {
	const testRoutes = defaultRoutes(action);
	const router = createMemoryRouter(testRoutes, {
		initialEntries: [initialRoute],
	});
	const renderResult = render(<RouterProvider router={router} />);
	return {
		...renderResult,
		router,
	};
};

export const givenTheRouter = async () => {
	const router = createBrowserRouter(routes);

	waitFor(() => {
		render(<RouterProvider router={router} />);
	});
};
