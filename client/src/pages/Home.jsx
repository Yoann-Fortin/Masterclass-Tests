import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UserConnect from "../components/UserConnect";

export default function Home() {
	const [nickname, setNickname] = useState("");
	useEffect(() => {
		const token = Cookies.get("user");
		setNickname(token);
	}, []);
	return (
		<>
			<UserConnect user={nickname} />
			<h1>Bienvenue à cette Masterclass sur les tests</h1>
		</>
	);
}
