import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '../../app/hooks';
import { addAccount } from '../reducers/AccountReducer';

export const AddAccount = () => {
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const dispatch = useAppDispatch();

	return (
		<>
			<Form>
				<Form.Group className='mb-3'>
					<Form.Label>Account name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Robinhood cash account'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Account description</Form.Label>
					<Form.Control
						as='textarea'
						type='text'
						placeholder='Description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<Form.Text className='text-muted'>
						Optionally include a description of how you use your account
					</Form.Text>
				</Form.Group>
				<Button
					variant='primary'
					type='submit'
					onClick={(e) => {
						e.preventDefault();
						dispatch(addAccount({ name, description, value: 0 }));
					}}
					disabled={name.length === 0}
				>
					Add
				</Button>
			</Form>
		</>
	);
};
