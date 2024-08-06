import { describe, beforeAll, afterAll, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createUser, deleteUser } from "../../src/services/userService";

import routes from "../../src/routes";

const USER_FIRSTNAME = "Toto";
const USER_LASTNAME = "TITI";
const USER_EMAIL = "toto.titi@tata.com";
const USER_PASSWORD = "password";
const LABEL_CONNECTION = "Se connecter";
const CONNECTION_TITLE = "Connexion";
const LABEL_EMAIL = "Email";
const LABEL_PASSWORD = "Mot de passe";
const LABEL_BUTTON = "Se connecter";
const HOME_TITLE = "Bienvenue à cette Masterclass sur les tests";
const WELCOME_MESSAGE = `Bon retour parmi nous ${USER_FIRSTNAME}`;

describe("E2E test for login functionality", async () => {
	let userId;

	beforeAll(async () => {
		const user = {
			firstName: USER_FIRSTNAME,
			lastName: USER_LASTNAME,
			email: USER_EMAIL,
			password: USER_PASSWORD,
		};
		try {
			userId = await createUser(user);
		} catch (error) {
			console.error("Failed to create user in setup:", error);
		}
	});

	afterAll(async () => {
		try {
			await deleteUser(userId);
		} catch (error) {
			console.error("Failed to delete user in cleanup:", error);
		}
	});

	it("should log in a user and redirect to the home page", async () => {
		const router = createBrowserRouter(routes);

		render(<RouterProvider router={router} />);

		const userConnect = screen.getByText(new RegExp(LABEL_CONNECTION, "i"));
		userEvent.click(userConnect);
		const connexionTitle = await screen.findByText(
			new RegExp(CONNECTION_TITLE, "i"),
		);
		expect(connexionTitle).toBeInTheDocument();

		const email = screen.getByLabelText(new RegExp(LABEL_EMAIL, "i"));
		const password = screen.getByLabelText(new RegExp(LABEL_PASSWORD, "i"));
		const submitButton = screen.getByRole(
			"button",
			new RegExp(LABEL_BUTTON, "i"),
		);

		await userEvent.type(email, USER_EMAIL);
		await userEvent.type(password, USER_PASSWORD);
		await userEvent.click(submitButton);

		await waitFor(() => {
			const homeTitle = screen.getByText(new RegExp(HOME_TITLE, "i"));
			expect(homeTitle).toBeInTheDocument();
			const message = screen.getByText(new RegExp(WELCOME_MESSAGE, "i"));
			expect(message).toBeInTheDocument();
		});
	});
});
