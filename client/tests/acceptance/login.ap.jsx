import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { afterAll, beforeAll } from "vitest";
import {
	userCreation,
	userDeletion,
	whenUserClickOn,
	whenUserConnectsWithTheRightInformation,
} from "../sut/userEvent";

import USER from "../sut/user.enum";

import { givenTheComponent, givenThePage, givenTheRouter } from "../sut/render";

import {
	thenTheTextDisplayedIs,
	thenTheUrlDisplayedIs,
	thenTheActionToHaveBeenCalled,
} from "../sut/expect";

import { Home } from "../../src/pages";

import { TITLE, LABEL, PATH, MESSAGE } from "../../enum";

import { UserConnect } from "../../src/components";

import givenALoginAction from "../sut/action";

const path = require("node:path");

const featurePath = path.resolve(__dirname, "../features/login.feature");
const feature = await loadFeature(featurePath);

describeFeature(feature, ({ Scenario }) => {
	let userId;
	beforeAll(async () => {
		userId = await userCreation();
	});
	afterAll(() => {
		userDeletion(userId);
	});
	Scenario(
		"Visiting the homepage and logging in",
		({ Given, When, Then, And }) => {
			Given("the user is on the homepage", async () => {
				givenTheComponent(<Home />);
				await thenTheTextDisplayedIs(TITLE.HOME);
			});

			Then("they should see a 'Se connecter' button", async () => {
				givenTheComponent(<UserConnect />);
				await thenTheTextDisplayedIs(LABEL.CONNECTION);
			});

			When("the user clicks on the 'Se connecter' button", async () => {
				const { router } = givenThePage({ initialRoute: PATH.HOME });
				whenUserClickOn(LABEL.CONNECTION);
				await thenTheUrlDisplayedIs(router, PATH.LOGIN);
			});

			Then("they are redirected to the login page", async () => {
				givenThePage({ initialRoute: PATH.HOME });
				whenUserClickOn(LABEL.CONNECTION);
				await thenTheTextDisplayedIs(TITLE.CONNECTION);
			});

			When("the user enters their credentials and submits", async () => {
				const login = givenALoginAction();
				givenThePage({ initialRoute: PATH.LOGIN, action: login });
				whenUserConnectsWithTheRightInformation();
				await thenTheActionToHaveBeenCalled(login);
			});

			Then("they are redirected back to the homepage", async () => {
				const login = givenALoginAction();
				givenThePage({ initialRoute: PATH.LOGIN, action: login });
				whenUserConnectsWithTheRightInformation();
				await thenTheTextDisplayedIs(TITLE.HOME);
			});

			And(
				"they see the welcome message 'Bon retour parmi nous [prénom de l'utilisateur]!'",
				async () => {
					givenTheRouter();
					whenUserClickOn(LABEL.CONNECTION);
					await thenTheTextDisplayedIs(TITLE.CONNECTION);
					whenUserConnectsWithTheRightInformation();
					await thenTheTextDisplayedIs(TITLE.HOME);
					await thenTheTextDisplayedIs(`${MESSAGE.WELCOME} ${USER.FIRSTNAME}`);
				},
			);
		},
	);
});
