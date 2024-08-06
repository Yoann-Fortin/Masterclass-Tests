import TitlePage from "../../components/TitlePage";
import FormComponent from "../../components/FormComponent";

export default function Login() {
	const inputs = [
		{
			label: "Email",
			id: "email",
			type: "email",
			isRequired: true,
		},
		{
			label: "Mot de passe",
			id: "password",
			type: "password",
			isRequired: true,
		},
	];
	return (
		<>
			<TitlePage title="Connexion" />
			<FormComponent method="post" inputs={inputs} />
		</>
	);
}