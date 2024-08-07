import PropTypes from "prop-types";

export default function TitlePage({ title }) {
	return <h1>{title}</h1>;
}

TitlePage.propTypes = {
	title: PropTypes.string.isRequired,
};
