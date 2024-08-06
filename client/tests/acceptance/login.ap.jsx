import {
	RouterProvider,
	createMemoryRouter,
	redirect,
	createBrowserRouter,
} from "react-router-dom";
import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { beforeAll, afterAll, expect, vi } from "vitest";
import Cookies from "js-cookie";

import App from "../../src/App";
import Home from "../../src/pages/Home";
import UserConnect from "../../src/components/UserConnect";
import Login from "../../src/pages/Login";

const path = require("node:path");

const featurePath = path.resolve(__dirname, "../features/login.feature");
const feature = await loadFeature(featurePath);

const renderComponent = (component, { route = "/" } = {}) => {
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

const defaultRoutes = [
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
			},
		],
	},
];

const renderPages = ({ route = "/", customRoutes = defaultRoutes } = {}) => {
	const router = createMemoryRouter(customRoutes, { initialEntries: [route] });
	const renderResult = render(<RouterProvider router={router} />);
	return {
		...renderResult,
		router,
	};
};

describeFeature(feature, ({ Scenario }) => {
	let userId;

	beforeAll(async () => {
		const user = {
			firstName: "Toto",
			lastName: "TITI",
			email: "toto.titi@tata.com",
			password: "password",
		};
		const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (response.ok) {
			const data = await response.json();
			userId = data.insertId;
		} else {
			throw new Error("Failed to create user");
		}
	});

	afterAll(async () => {
		if (userId) {
			await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
		}
	});
	Scenario(
		"Visiting the homepage and logging in",
		({ Given, When, Then, And }) => {
			Given("the user is on the homepage", () => {
				renderComponent(<Home />);

				const title = screen.getByText(
					/Bienvenue à cette Masterclass sur les tests/i,
				);
				expect(title).toBeInTheDocument();
			});

			Then("they should see a 'Se connecter' button", () => {
				renderComponent(<UserConnect />);

				const loginLink = screen.getByText(/Se connecter/i);
				expect(loginLink).toBeInTheDocument();
				expect(loginLink).toHaveAttribute("href", "/login");
			});

			When("the user clicks on the 'Se connecter' button", async () => {
				const { router } = renderPages({ route: "/" });

				const loginLink = screen.getByText(/Se connecter/i);
				await userEvent.click(loginLink);
				await waitFor(() => {
					expect(router.state.location.pathname).toBe("/login");
				});
			});

			Then("they are redirected to the login page", async () => {
				renderPages({ route: "/" });
				const userConnect = screen.getByText(/Se connecter/i);
				userEvent.click(userConnect);
				const title = await screen.findByText(/Connexion/i);
				expect(title).toBeInTheDocument();
			});

			When("the user enters their credentials and submits", async () => {
				const login = vi.fn(() => redirect("/"));

				const customRoutes = [
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
								action: login,
							},
						],
					},
				];

				renderPages({ route: "/login", customRoutes });

				const email = screen.getByLabelText(/Email/i);
				const password = screen.getByLabelText(/Mot de passe/i);
				const submitButton = screen.getByRole("button", {
					name: /Se connecter/i,
				});
				await userEvent.type(email, "toto.tata@titi.com");
				await userEvent.type(password, "password");
				await userEvent.click(submitButton);
				await waitFor(() => {
					expect(login).toHaveBeenCalled();
				});
			});

			Then("they are redirected back to the homepage", async () => {
				const login = vi.fn(() => redirect("/"));

				const customRoutes = [
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
								action: login,
							},
						],
					},
				];

				renderPages({ route: "/login", customRoutes });

				const email = screen.getByLabelText(/Email/i);
				const password = screen.getByLabelText(/Mot de passe/i);
				const submitButton = screen.getByRole("button", {
					name: /Se connecter/i,
				});
				await userEvent.type(email, "toto.tata@titi.com");
				await userEvent.type(password, "password");
				await userEvent.click(submitButton);
				await waitFor(() => {
					const title = screen.getByText(
						/Bienvenue à cette Masterclass sur les tests/i,
					);
					expect(title).toBeInTheDocument();
				});
			});

			And(
				"they see the welcome message 'Bon retour parmi nous [prénom de l'utilisateur]!'",
				async () => {
					const login = async ({ request }) => {
						const formData = await request.formData();
						const data = Object.fromEntries(formData.entries());

						const response = await fetch(
							`${import.meta.env.VITE_API_URL}/api/users/login`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify(data),
							},
						);

						if (response.status === 201) {
							const user = await response.json();
							Cookies.set("user", user.firstName, { expires: 7 });
							return redirect("/");
						}
						return null;
					};

					const router = createBrowserRouter([
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
									action: login,
								},
							],
						},
					]);

					render(<RouterProvider router={router} />);

					const userConnect = screen.getByText(/Se connecter/i);
					userEvent.click(userConnect);
					const connexionTitle = await screen.findByText(/Connexion/i);
					expect(connexionTitle).toBeInTheDocument();

					const email = screen.getByLabelText(/Email/i);
					const password = screen.getByLabelText(/Mot de passe/i);
					const submitButton = screen.getByRole("button", {
						name: /Se connecter/i,
					});
					await userEvent.type(email, "toto.titi@tata.com");
					await userEvent.type(password, "password");
					await userEvent.click(submitButton);

					await waitFor(() => {
						const homeTitle = screen.getByText(
							/Bienvenue à cette Masterclass sur les tests/i,
						);
						expect(homeTitle).toBeInTheDocument();
						const message = screen.getByText(/Bon retour parmi nous toto/i);
						expect(message).toBeInTheDocument();
					});
				},
			);
		},
	);
});
