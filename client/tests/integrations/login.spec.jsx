import { describe, it, expect, vi } from "vitest";
import { redirect } from "react-router-dom";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {renderPage} from "../utils";

import Login from "../../src/pages/Login";

const INITIAL_ROUTE = "/login";
const LABEL_EMAIL = "Email";
const LABEL_PASSWORD = "Mot de passe";
const LABEL_BUTTON = "Se connecter";
const USER_EMAIL = "toto.tata@titi.com";
const USER_PASSWORD = "password";
const HOME_TITLE = "Bienvenue à cette Masterclass sur les tests";

describe("Login integration test", () => {
	it("should redirect to the home page on successful login", async () => {
		const login = vi.fn(() => redirect("/"));

		await renderPage(Login, { route: INITIAL_ROUTE, action: login });

		const email = screen.getByLabelText(new RegExp(LABEL_EMAIL, "i"));
		const password = screen.getByLabelText(new RegExp(LABEL_PASSWORD, "i"));
		const submitButton = screen.getByRole("button", {
			name: new RegExp(LABEL_BUTTON, "i"),
		});

		await userEvent.type(email, USER_EMAIL);
		await userEvent.type(password, USER_PASSWORD);
		await userEvent.click(submitButton);

		await waitFor(() => {
			expect(login).toHaveBeenCalled();

			const title = screen.getByText(new RegExp(HOME_TITLE, "i"));
			expect(title).toBeInTheDocument();
		});
	});
});
