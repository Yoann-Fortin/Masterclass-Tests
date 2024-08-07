import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { UserConnect, TitlePage } from "../../components";

import { TITLE } from "../../../enum";

export default function Home() {
	const [firstName, setFirstName] = useState("");
	useEffect(() => {
		const token = Cookies.get("user");
		setFirstName(token);
	}, []);
	return (
		<>
			<UserConnect user={firstName} />
			<TitlePage title={TITLE.HOME} />
		</>
	);
}
