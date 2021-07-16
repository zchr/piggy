import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '../../app/hooks';
import { addAccount } from '../reducers/AccountReducer';

interface Props {
	isAddingAccount: boolean;
	setIsAddingAccount: () => void;
}

export const AddAccount = (props: Props) => {
	const { isAddingAccount, setIsAddingAccount } = props;
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [isCash, setIsCash] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	return (
		<>
			<Modal show={isAddingAccount} onHide={setIsAddingAccount}>
				<Modal.Header>
					<Modal.Title>Add account</Modal.Title>
					<Button variant='link' onClick={setIsAddingAccount}>
						Close
					</Button>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3'>
							<Form.Label>Account name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Robinhood cash account'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Account description</Form.Label>
							<Form.Control
								as='textarea'
								type='text'
								placeholder='Description'
								value={description}
								onChange={e => setDescription(e.target.value)}
							/>
							<Form.Text className='text-muted'>
								Optionally include a description of how you use your account
							</Form.Text>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Check
								type='checkbox'
								label='This is a cash account'
								checked={isCash}
								onChange={e => setIsCash(e.target.checked)}
							/>
						</Form.Group>
						<Button
							variant='primary'
							type='submit'
							onClick={e => {
								e.preventDefault();
								setName('');
								setDescription('');
								dispatch(addAccount({ name, description, isCash }));
								setIsAddingAccount();
							}}
							disabled={name.length === 0}
						>
							Add
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};
