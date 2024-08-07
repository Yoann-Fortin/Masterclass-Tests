import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import { renderComponent } from "../utils";

import UserConnect from "../../src/components/UserConnect";

const USER_NOT_CONNECTED_VALUE = "Se connecter";
const USER_NOT_CONNECTED_LINK = "/login";
const USERNAME = "Toto";
const USER_CONNECTED_VALUE = `Bon retour parmi nous ${USERNAME}`;

describe("UserComponent", () => {
	it("should display login link when user is not connected", () => {
		renderComponent(<UserConnect />);

		const loginLink = screen.getByText(
			new RegExp(USER_NOT_CONNECTED_VALUE, "i"),
		);
		expect(loginLink).toBeInTheDocument();
		expect(loginLink).toHaveAttribute("href", USER_NOT_CONNECTED_LINK);
	});

	it("should display username when user is connected", () => {
		renderComponent(<UserConnect user={USERNAME} />);

		const welcomeMessage = screen.getByText(
			new RegExp(USER_CONNECTED_VALUE, "i"),
		);
		expect(welcomeMessage).toBeInTheDocument();
	});
});
