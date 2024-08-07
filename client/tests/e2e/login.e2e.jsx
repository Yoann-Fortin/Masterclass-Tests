import { beforeAll, afterAll, describe, it } from "vitest";

import {
	userCreation,
	userDeletion,
	whenUserClickOn,
	whenUserConnectsWithTheRightInformation,
} from "../sut/userEvent";
import { givenTheRouter } from "../sut/render";

import { LABEL, MESSAGE, TITLE } from "../../enum";
import { thenTheTextDisplayedIs } from "../sut/expect";
import USER from "../sut/user.enum";

describe("E2E test for login functionality", async () => {
	let userId;
	beforeAll(async () => {
		userId = await userCreation();
	});
	afterAll(() => {
		userDeletion(userId);
	});
	it("should log in a user and redirect to the home page", async () => {
		givenTheRouter();
		whenUserClickOn(LABEL.CONNECTION);
		await thenTheTextDisplayedIs(TITLE.CONNECTION);
		whenUserConnectsWithTheRightInformation();
		await thenTheTextDisplayedIs(TITLE.HOME);
		await thenTheTextDisplayedIs(`${MESSAGE.WELCOME} ${USER.FIRSTNAME}`);
	});
});
