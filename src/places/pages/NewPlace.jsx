import React from "react";

import "./NewPlace.css";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const NewPlace = () => {
	const [formState, inputHandler] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
			address: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const placeSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs); // send it to backend
	};

	return (
		<form className="place-form" onSubmit={placeSubmitHandler}>
			<Input
				id="title"
				type="text"
				label="title"
				element="input"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid title."
				onInput={inputHandler}
			/>
			<Input
				id="description"
				label="description"
				element="textarea"
				validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
				errorText="Please enter a valid description min:5 length"
				onInput={inputHandler}
			/>
			<Input
				id="address"
				type="text"
				label="address"
				element="input"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid address."
				onInput={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				ADD PLACE
			</Button>
		</form>
	);
};

export default NewPlace;
