import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import './NewPlace.css';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../shared/components/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const NewPlace = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [formState, inputHandler] = useForm(
		{
			title: {
				value: '',
				isValid: false,
			},
			description: {
				value: '',
				isValid: false,
			},
			address: {
				value: '',
				isValid: false,
			},
			image: {
				value: null,
				isValid: false,
			},
		},
		false
	);

	const history = useHistory();

	const placeSubmitHandler = async (event) => {
		event.preventDefault();
		console.log(auth)
		try {
			const formData = new FormData();
			formData.append('title', formState.inputs.title.value);
			formData.append('description', formState.inputs.description.value);
			formData.append('address', formState.inputs.address.value);
			formData.append('image', formState.inputs.image.value);
			await sendRequest(process.env.REACT_APP_BACKEND_URL + '/places', 'POST', formData, {
				Authorization: 'Bearer ' + auth.token,
			});
			history.push('/');
		} catch (error) {}
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			<form className='place-form' onSubmit={placeSubmitHandler}>
				{isLoading && <LoadingSpinner asOverlay />}
				<Input
					id='title'
					type='text'
					label='title'
					element='input'
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid title.'
					onInput={inputHandler}
				/>
				<Input
					id='description'
					label='description'
					element='textarea'
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
					errorText='Please enter a valid description min:5 length'
					onInput={inputHandler}
				/>
				<Input
					id='address'
					type='text'
					label='address'
					element='input'
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid address.'
					onInput={inputHandler}
				/>
				<ImageUpload
					id='image'
					onInput={inputHandler}
					errorText='Please provide an Image'
				/>
				<Button type='submit' disabled={!formState.isValid}>
					ADD PLACE
				</Button>
			</form>
		</>
	);
};

export default NewPlace;
