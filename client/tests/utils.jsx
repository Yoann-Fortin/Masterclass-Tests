import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import Login from "../src/pages/Login";
import Home from "../src/pages/Home";

export function renderComponent(component, { route = "/" } = {}) {
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
}

export async function renderPage(
	component,
	{ route = "/", action = null } = {},
) {
	const routes = [
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/login",
			element: <Login />,
			action,
		},
	];

	const router = createMemoryRouter(routes, { initialEntries: [route] });

	const renderResult = render(<RouterProvider router={router} />);

	return renderResult;
}
