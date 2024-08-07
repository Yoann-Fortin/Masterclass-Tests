import { LABEL, TITLE } from "../../../enum";

import { TitlePage, FormComponent } from "../../components";

export default function Login() {
	const inputs = [
		{
			label: LABEL.EMAIL,
			id: "email",
			type: "email",
			isRequired: true,
		},
		{
			label: LABEL.PASSWORD,
			id: "password",
			type: "password",
			isRequired: true,
		},
	];
	return (
		<>
			<TitlePage title={TITLE.CONNECTION} />
			<FormComponent method="post" inputs={inputs} />
		</>
	);
}
