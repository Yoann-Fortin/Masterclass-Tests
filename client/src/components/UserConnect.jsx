import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function UserConnect({ user }) {
	return user ? (
		<p>Bon retour parmi nous {user}</p>
	) : (
		<Link to="/login"> Se connecter</Link>
	);
}

UserConnect.propTypes = {
	user: PropTypes.string,
};

UserConnect.defaultProps = {
	user: "",
};