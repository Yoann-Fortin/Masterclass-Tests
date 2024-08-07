import { redirect } from "react-router-dom";
import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { screen, waitFor } from "@testing-library/react";
import { beforeAll, afterAll, expect, vi } from "vitest";

import { createUser, deleteUser } from "../../src/services/userService";

import Home from "../../src/pages/Home";
import UserConnect from "../../src/components/UserConnect";

import {
	USER_EMAIL,
	USER_PASSWORD,
	renderComponent,
	checkText,
	userClick,
	renderPages,
	userConnection,
	renderRouter,
} from "../utils";

const path = require("node:path");

const featurePath = path.resolve(__dirname, "../features/login.feature");
const feature = await loadFeature(featurePath);

const USER_FIRSTNAME = "Toto";
const USER_LASTNAME = "TITI";
const HOME_TITLE = "Bienvenue à cette Masterclass sur les tests";
const LABEL_CONNECTION = "Se connecter";
const PATH_CONNECTION = "/login";
const PATH_HOME = "/";
const CONNECTION_TITLE = "Connexion";
const WELCOME_MESSAGE = `Bon retour parmi nous ${USER_FIRSTNAME}`;

describeFeature(feature, ({ Scenario }) => {
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

	Scenario(
		"Visiting the homepage and logging in",
		({ Given, When, Then, And }) => {
			Given("the user is on the homepage", async () => {
				renderComponent(<Home />);

				await checkText(HOME_TITLE);
			});

			Then("they should see a 'Se connecter' button", () => {
				renderComponent(<UserConnect />);

				const loginLink = screen.getByText(new RegExp(LABEL_CONNECTION, "i"));
				expect(loginLink).toBeInTheDocument();
				expect(loginLink).toHaveAttribute("href", PATH_CONNECTION);
			});

			When("the user clicks on the 'Se connecter' button", async () => {
				const { router } = renderPages({ initialRoute: PATH_HOME });

				userClick(LABEL_CONNECTION);

				await waitFor(() => {
					expect(router.state.location.pathname).toBe(PATH_CONNECTION);
				});
			});

			Then("they are redirected to the login page", async () => {
				renderPages({ route: PATH_HOME });

				userClick(LABEL_CONNECTION);

				await checkText(CONNECTION_TITLE);
			});

			When("the user enters their credentials and submits", async () => {
				const login = vi.fn(() => redirect(PATH_HOME));

				renderPages({ initialRoute: PATH_CONNECTION, action: login });

				await userConnection();

				await waitFor(() => {
					expect(login).toHaveBeenCalled();
				});
			});

			Then("they are redirected back to the homepage", async () => {
				const login = vi.fn(() => redirect(PATH_HOME));

				renderPages({ initialRoute: "/login", action: login });

				await userConnection();

				await waitFor(() => {
					checkText(HOME_TITLE);
				});
			});

			And(
				"they see the welcome message 'Bon retour parmi nous [prénom de l'utilisateur]!'",
				async () => {
					renderRouter();

					userClick(LABEL_CONNECTION);

					await checkText(CONNECTION_TITLE);

					await userConnection();

					await waitFor(() => {
						checkText(HOME_TITLE);
						checkText(WELCOME_MESSAGE);
					});
				},
			);
		},
	);
});
