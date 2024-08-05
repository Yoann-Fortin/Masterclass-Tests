import { Form } from "react-router-dom";

function Login() {
	return (
		<>
			<h1>Login Page</h1>;
			<Form method="post">
				<label htmlFor="nickname">Pseudo</label>
				<input type="text" name="nickname" id="nickname" required />
				<label htmlFor="password">Mot de passe</label>
				<input type="password" name="password" id="password" required />
				<button type="submit">Se connecter</button>
			</Form>
		</>
	);
}

export default Login;
