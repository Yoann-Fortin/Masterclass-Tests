import PropTypes from "prop-types";

export default function Input({ label, id, type, isRequired }) {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			<input type={type} name={id} id={id} required={isRequired} />
		</>
	);
}

Input.propTypes = {
	label: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	isRequired: PropTypes.bool.isRequired,
};