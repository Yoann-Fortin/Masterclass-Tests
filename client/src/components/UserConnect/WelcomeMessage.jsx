import PropTypes from "prop-types";

import MESSAGE from "../../../enum/message.enum";

export default function WelcomeMessage({ user }) {
	return (
		<p>
			{MESSAGE.WELCOME} {user}
		</p>
	);
}

WelcomeMessage.propTypes = {
	user: PropTypes.string.isRequired,
};
