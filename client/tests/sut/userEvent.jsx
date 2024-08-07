import { screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { createUser, deleteUser } from "../../src/services/userService";

import { LABEL } from "../../enum";

import USER from "./user.enum";

export const userCreation = async () => {
	try {
		const userId = await createUser({
			firstName: USER.FIRSTNAME,
			lastName: USER.LASTNAME,
			email: USER.EMAIL,
			password: USER.PASSWORD,
		});
		return userId;
	} catch (error) {
		console.error("Failed to create user in setup:", error);
	}
	return null;
};

export const userDeletion = async (userId) => {
	try {
		await deleteUser(userId);
	} catch (error) {
		console.error("Failed to delete user in cleanup:", error);
	}
};

export const whenUserClickOn = async (text) => {
	await waitFor(() => {
		const result = screen.getByText(new RegExp(text, "i"));
		userEvent.click(result);
	});
};

export const whenUserConnectsWithTheRightInformation = async () => {
	const email = screen.getByLabelText(new RegExp(LABEL.EMAIL, "i"));
	const password = screen.getByLabelText(new RegExp(LABEL.PASSWORD, "i"));
	const submitButton = screen.getByRole("button", {
		name: new RegExp(LABEL.BUTTON, "i"),
	});
	await userEvent.type(email, USER.EMAIL);
	await userEvent.type(password, USER.PASSWORD);
	await userEvent.click(submitButton);
};
