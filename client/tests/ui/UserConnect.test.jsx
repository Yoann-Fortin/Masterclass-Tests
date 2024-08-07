import { describe, it } from "vitest";

import { givenTheComponent } from "../sut/render";

import { UserConnect } from "../../src/components";

import USER from "../sut/user.enum";

import { LABEL, MESSAGE } from "../../enum";

import { thenTheTextDisplayedIs } from "../sut/expect";

describe("UserComponent", () => {
	it("should display login link when user is not connected", async () => {
		givenTheComponent(<UserConnect />);
		await thenTheTextDisplayedIs(LABEL.CONNECTION);
	});

	it("should display username when user is connected", async () => {
		givenTheComponent(<UserConnect user={USER.FIRSTNAME} />);
		await thenTheTextDisplayedIs(`${MESSAGE.WELCOME} ${USER.FIRSTNAME}`);
	});
});
