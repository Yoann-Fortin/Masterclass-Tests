import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

import fetchData from "./fetchService";

export default async function login(request) {
	const formData = await request.formData();
	const userData = Object.fromEntries(formData.entries());
	const options = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(userData),
	};
	try {
		const user = await fetchData("/api/users/login", options);
		if (user) {
			Cookies.set("user", user.firstName, { expires: 7 });
			return redirect("/");
		}
	} catch (error) {
		console.error("Login failed", error);
	}
	return null;
}