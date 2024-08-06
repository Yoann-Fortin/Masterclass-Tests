import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { expect } from "vitest";

import {
	createMemoryRouter,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";

import App from "../src/App";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";

import routes from "../src/routes";

const LABEL_EMAIL = "Email";
const LABEL_PASSWORD = "Mot de passe";
const LABEL_BUTTON = "Se connecter";

export const USER_EMAIL = "toto.titi@tata.com";
export const USER_PASSWORD = "password";

const defaultRoutes = (action) => [
	{
		element: <App />,
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/login", element: <Login />, action },
		],
	},
];

export const renderComponent = (component, { route = "/" } = {}) => {
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

export const checkText = async (text) => {
	const title = await screen.findByText(new RegExp(text, "i"));
	expect(title).toBeInTheDocument();
};

export const userClick = (text) => {
	const userConnect = screen.getByText(new RegExp(text, "i"));
	userEvent.click(userConnect);
};

export const renderPages = ({ initialRoute = "/", action = null } = {}) => {
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

export const userConnection = async () => {
	const email = screen.getByLabelText(new RegExp(LABEL_EMAIL, "i"));
	const password = screen.getByLabelText(new RegExp(LABEL_PASSWORD, "i"));
	const submitButton = screen.getByRole("button", {
		name: new RegExp(LABEL_BUTTON, "i"),
	});
	await userEvent.type(email, "toto.tata@titi.com");
	await userEvent.type(password, "password");
	await userEvent.click(submitButton);
};

export const renderRouter = () => {
	const router = createBrowserRouter(routes);

	render(<RouterProvider router={router} />);
};
