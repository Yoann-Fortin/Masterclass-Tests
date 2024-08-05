import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

export default function renderComponent(component, { route = "/" } = {}) {
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
}
