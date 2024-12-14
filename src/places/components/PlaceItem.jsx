import React, { useContext, useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import "./PlaceItem.css";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Maps from "../../shared/components/UIElements/Maps";
import { AuthContext } from "../../shared/context/auth-context";

const PlaceItem = (props) => {
	const auth = useContext(AuthContext)
	const [showMap, setShowMap] = useState(false);
	const [showConfirmModal, setShowConfirmModal] = useState(false);


	const openMapHandler = () => setShowMap(true);
	const closeMapHandler = () => setShowMap(false);

	const showDeleteHandler = () => setShowConfirmModal(true);
	const cancelDeleteHandler = () => setShowConfirmModal(false);

	const confirmDeleteHandler = () => {
		setShowConfirmModal(false);
		console.log('deleting...')
	}

	return (
		<>
			<Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={props.address}
				contentClass="place-item__modal-content"
				footerClass="place-item__modal-actions"
				footer={<Button onClick={closeMapHandler}>Close</Button>}
			>
				<div className="map-container">
					<Maps center={props.coordinates} zoom={16} />
				</div>
			</Modal>
			<Modal
				show={showConfirmModal}
				onCancel={cancelDeleteHandler}
				header="are you sure?"
				contentClass="place-item__modal-content"
				footerClass="place-item__modal-actions"
				footer={
					<>
						<Button inverse onClick={cancelDeleteHandler}>Cancel</Button>
						<Button danger onClick={confirmDeleteHandler}>Delete</Button>
					</>
				}
			>
				<p>Do you want to delete this place?</p>
			</Modal>
			<li className="place-item">
				<Card className="place-item__content">
					<div className="place-item__image">
						<img src={props.image} alt={props.title} />
					</div>
					<div className="place-item__info">
						<h2>{props.title}</h2>
						<h3>{props.address}</h3>
						<p>{props.description}</p>
					</div>
					<div className="place-item__actions">
						<Button inverse onClick={openMapHandler}>
							VIEW ON MAP
						</Button>
						{auth.isLoggedIn && <Button to={`/places/${props.id}`}>EDIT</Button>}
						{auth.isLoggedIn && <Button danger onClick={showDeleteHandler}>DELETE</Button>}
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;
