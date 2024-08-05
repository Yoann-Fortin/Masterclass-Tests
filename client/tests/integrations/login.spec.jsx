import { describe, it, expect, vi } from "vitest";
import { createMemoryRouter, RouterProvider, redirect } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "../../src/pages/Login";
import Home from "../../src/pages/Home";

describe("Login integration test", () => {
	it("should redirect to the home page on successful login", async () => {
		const login = vi.fn(() => redirect("/"));

		const router = createMemoryRouter(
			[
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/connect",
					element: <Login />,
					action: login,
				},
			],
			{
				initialEntries: ["/connect"],
			},
		);

		render(<RouterProvider router={router} />);

		const pseudo = screen.getByLabelText(/Pseudo/i);
		const password = screen.getByLabelText(/Mot de passe/i);
		const submitButton = screen.getByRole("button", {
			name: /Se connecter/i,
		});
		await userEvent.type(pseudo, "toto");
		await userEvent.type(password, "password");
		await userEvent.click(submitButton);
		await waitFor(() => {
			expect(login).toHaveBeenCalled();
			
			const title = screen.getByText(
				/Bienvenue à cette Masterclass sur les tests/i,
			);
			expect(title).toBeInTheDocument();
		});
	});
});
