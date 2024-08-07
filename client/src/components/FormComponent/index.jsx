import { Form } from "react-router-dom";
import PropTypes from "prop-types";

import Input from "./Input";
import Button from "./Button";

import { LABEL } from "../../../enum";

export default function FormComponent({ method, inputs }) {
	return (
		<Form method={method}>
			{inputs.map((input) => (
				<Input
					key={input.id}
					label={input.label}
					id={input.id}
					type={input.type}
					isRequired={input.isRequired}
				/>
			))}
			<Button text={LABEL.BUTTON} />
		</Form>
	);
}

FormComponent.propTypes = {
	method: PropTypes.string.isRequired,
	inputs: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			isRequired: PropTypes.bool.isRequired,
		}),
	).isRequired,
};
