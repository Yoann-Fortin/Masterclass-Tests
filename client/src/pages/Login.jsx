import { Form } from "react-router-dom";

function Login() {
	return (
		<>
			<h1>Connexion</h1>;
			<Form method="post">
				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" required />
				<label htmlFor="password">Mot de passe</label>
				<input type="password" name="password" id="password" required />
				<button type="submit">Se connecter</button>
			</Form>
		</>
	);
}

export default Login;