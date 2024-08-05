import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import UserConnect from "../../src/components/UserConnect";

const renderComponent = (component, { route = "/" } = {}) => {
	const router = createMemoryRouter(
		[
			{
				path: "*",
				element: component,
			},
		],
		{
			initialEntries: [route],
		},
	);

	const renderResult = render(<RouterProvider router={router} />);

	return renderResult;
};

describe("UserComponent", () => {
	it("should display login link when user is not connected", () => {
		renderComponent(<UserConnect />);

		const loginLink = screen.getByText(/Se connecter/i);
		expect(loginLink).toBeInTheDocument();
		expect(loginLink).toHaveAttribute("href", "/connect");
	});

	it("should display username when user is connected", () => {
		const user = "Toto";
		renderComponent(<UserConnect user={user} />);

		const username = screen.getByText(/Bon retour parmi nous Toto/i);
		expect(username).toBeInTheDocument();
	});
});
