import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import "./Auth.css";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
    const auth = useContext(AuthContext)
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: "",
				isValid: false,
			},
			password: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const authSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs);
        auth.login()
	};

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
                    ...formState.inputs,
					name: undefined,
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: "",
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};

	return (
		<Card className="authentication">
			<h2 className="authentication__header">Login Required</h2>
			<hr />
			<form onSubmit={authSubmitHandler}>
				{!isLoginMode && (
					<Input
						element="input"
						id="name"
						type="text"
						label="Your Name"
						validators={[VALIDATOR_REQUIRE()]}
						errorText="Please enter a Name."
						onInput={inputHandler}
					/>
				)}
				<Input
					element="input"
					id="email"
					type="email"
					label="E-mail"
					validators={[VALIDATOR_EMAIL()]}
					errorText="Please enter a valid Email."
					onInput={inputHandler}
				/>
				<Input
					element="input"
					id="password"
					type="password"
					label="Password"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid Password (min 5 char)."
					onInput={inputHandler}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					{isLoginMode ? "Login" : "Sign Up"}
				</Button>
			</form>
			<Button inverse onClick={switchModeHandler}>
				Switch to {!isLoginMode ? "Login" : "Sign Up"}
			</Button>
		</Card>
	);
};

export default Auth;
