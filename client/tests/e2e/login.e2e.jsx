import { describe, beforeAll, afterAll, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";
import Cookies from "js-cookie";

import App from "../../src/App";
import Home from "../../src/pages/Home";
import Login from "../../src/pages/Login";

describe("E2E test for login functionality", async () => {
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

	it("should log in a user and redirect to the home page", async () => {
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
	});
});
