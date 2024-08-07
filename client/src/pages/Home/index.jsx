import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import UserConnect from "../../components/UserConnect";
import TitlePage from "../../components/TitlePage";

export default function Home() {
	const [firstName, setFirstName] = useState("");
	useEffect(() => {
		const token = Cookies.get("user");
		setFirstName(token);
	}, []);
	return (
		<>
			<UserConnect user={firstName} />
			<TitlePage title="Bienvenue à cette Masterclass sur les tests" />
		</>
	);
}
