import { describe, it } from "vitest";

import givenALoginAction from "../sut/action";

import { givenThePage } from "../sut/render";

import { PATH, TITLE } from "../../enum";

import { whenUserConnectsWithTheRightInformation } from "../sut/userEvent";

import {
	thenTheActionToHaveBeenCalled,
	thenTheTextDisplayedIs,
} from "../sut/expect";

describe("Login integration test", () => {
	it("should redirect to the home page on successful login", async () => {
		const login = givenALoginAction();
		givenThePage({ initialRoute: PATH.LOGIN, action: login });
		whenUserConnectsWithTheRightInformation();
		await thenTheActionToHaveBeenCalled(login);
		await thenTheTextDisplayedIs(TITLE.HOME);
	});
});
