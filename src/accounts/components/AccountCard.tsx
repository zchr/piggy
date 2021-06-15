import React from 'react';
import { Card } from 'react-bootstrap';
import { AccountMetadataState } from '../reducers/AccountReducer';

interface Props {
	accountMetadata: AccountMetadataState;
}

export const AccountCard = (props: Props) => {
	const { name, description, value } = props.accountMetadata;
	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title className='d-flex justify-content-between'>
						<span>{name}</span>
						<span>${value}</span>
					</Card.Title>
					<Card.Text>{description}</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
};
