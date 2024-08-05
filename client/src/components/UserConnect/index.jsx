import PropTypes from "prop-types";

import WelcomeMessage from "./WelcomeMessage";
import NavItem from "./NavItem";

export default function UserConnect({ user }) {
	return user ? <WelcomeMessage user={user} /> : <NavItem />;
}

UserConnect.propTypes = {
	user: PropTypes.string,
};

UserConnect.defaultProps = {
	user: "",
};