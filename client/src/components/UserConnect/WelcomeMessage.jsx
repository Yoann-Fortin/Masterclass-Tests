import PropTypes from "prop-types";

export default function WelcomeMessage({ user }) {
	return <p>Bon retour parmi nous {user}</p>;
}

WelcomeMessage.propTypes = {
	user: PropTypes.string.isRequired,
};