import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserConnect from "../components/UserConnect"

export default function Home() {
	const [firstName, setFirstName] = useState("");
	useEffect(() => {
		const token = Cookies.get("user");
		setFirstName(token);
	}, []);
	return (
		<>
			<UserConnect user={firstName} />
			<h1>Bienvenue à cette Masterclass sur les tests</h1>
		</>
	);
}
