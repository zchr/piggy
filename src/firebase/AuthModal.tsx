import React, { useState } from 'react';
import { Alert, Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import firebase from './auth';

interface Props {
	show: boolean;
	onHide: () => void;
}

export const AuthModal = (props: Props) => {
	const { show, onHide } = props;
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isCreatingAccount, setIsCreatingAccount] = useState<
		boolean | undefined
	>(undefined);
	const [error, setError] = useState<string | undefined>(undefined);

	const header = isCreatingAccount ? 'Sign up' : 'Sign in';

	const signUpOrSignIn = () =>
		isCreatingAccount
			? firebase.auth().createUserWithEmailAndPassword(email, password)
			: firebase.auth().signInWithEmailAndPassword(email, password);

	return (
		<>
			<Modal show={show} onHide={onHide}>
				<Modal.Header>
					<Modal.Title>{header}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Button
						onClick={() => setIsCreatingAccount(true)}
						variant='link'
						disabled={isCreatingAccount === true}
					>
						Make a new account
					</Button>
					<Button
						onClick={() => setIsCreatingAccount(false)}
						variant='link'
						disabled={isCreatingAccount === false}
					>
						Sign into existing account
					</Button>
					{isCreatingAccount !== undefined && (
						<Form>
							<Form.Group className='mb-3'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</Form.Group>
							<Form.Group className='mb-3'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
							</Form.Group>
							<Button
								variant='primary'
								type='submit'
								onClick={e => {
									e.preventDefault();

									signUpOrSignIn()
										.then(userCredential => {
											setEmail('');
											setPassword('');
											onHide();
										})
										.catch(error => {
											setError(error.message);
										});
								}}
								disabled={email.length === 0 || password.length === 0}
							>
								{header}
							</Button>
						</Form>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
};
