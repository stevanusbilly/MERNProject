import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/components/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import "./UpdatePlace.css";

const DUMMY_PLACES = [
	{
		id: "p1",
		title: "Borobudur Temple",
		description: "one of the funniest place",
		imageUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2SYpibWv2Wwn-RQKiBsnLBUCGrw7jXw3kHA&s",
		address:
			"Jl. Badrawati, Kw. Candi Borobudur, Borobudur, Kec. Borobudur, Kabupaten Magelang, Jawa Tengah",
		location: {
			lat: -7.6078738,
			lng: 110.2011764,
		},
		creator: "u1",
	},
	{
		id: "p2",
		title: "Borobudur Temple...",
		description: "one of the funniest place",
		imageUrl:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2SYpibWv2Wwn-RQKiBsnLBUCGrw7jXw3kHA&s",
		address:
			"Jl. Badrawati, Kw. Candi Borobudur, Borobudur, Kec. Borobudur, Kabupaten Magelang, Jawa Tengah",
		location: {
			lat: -7.6078738,
			lng: 110.2011764,
		},
		creator: "u2",
	},
];

const UpdatePlace = (props) => {
    const [isLoading, setIsLoading] = useState(true);
	const placeId = useParams().placeId;

	const [formState, inputHandler, setFormData] = useForm(
		{
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
        },
        false
	);

	const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

    useEffect(() => {
        if(identifiedPlace){
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true,
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true,
                },
            },
            true);
        }
        setIsLoading(false);
    }, [setFormData, identifiedPlace])

	const placeUpdateSubmitHandler = (event) => {
		event.preventDefault();
		console.log(formState.inputs);
	};

	if (!identifiedPlace) {
		return (
			<div className="center">
                <Card>
    				<h2>Could Not Find Place!</h2>
                </Card>
			</div>
		);
	}

    if(isLoading){
        return (
            <div className="center">
				<h2>Loading ... </h2>
            </div>
        )
    }

	return (
		<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
			<Input
				id="title"
				element="input"
				type="text"
				label="Title"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid title."
				onInput={inputHandler}
				initialValue={formState.inputs.title.value}
				initialValid={formState.inputs.title.isValid}
			/>
			<Input
				id="description"
				element="textarea"
				label="Descripton"
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText="Please enter a valid Description. Min 5 char"
				onInput={inputHandler}
				initialValue={formState.inputs.description.value}
				initialValid={formState.inputs.description.isValid}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				UPDATE PLACE
			</Button>
		</form>
	);
};

export default UpdatePlace;
