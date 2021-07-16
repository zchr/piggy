import React, { useEffect, useState } from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useAppSelector as useSelector } from '../../app/hooks';
import { AddAccount } from './AddAccount';
import firebase from '../../firebase/auth';
import { AuthModal } from '../../firebase/AuthModal';

interface Props {
	user: firebase.User | null;
}

export const Nav = (props: Props) => {
	const { user } = props;
	const [isAddingAccount, setIsAddingAccount] = useState<boolean>(false);
	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

	const state = useSelector(state => state.account);

	const save = (e: any | undefined) => {
		if (e) {
			e.preventDefault();
		}
		localStorage.setItem('accounts', JSON.stringify(state.accounts));

		if (user && user.uid) {
			firebase.firestore().collection('users').doc(user.uid).set(state);
		}
	};

	useEffect(() => {
		save(undefined);
	});

	return (
		<Navbar bg='light' expand='lg' className='mb-3'>
			<Container className='justify-content-between'>
				<Button variant='primary' onClick={() => setIsAddingAccount(true)}>
					Add account
				</Button>
				<div>
					{user ? (
						<Button className='mx-3' onClick={() => firebase.auth().signOut()}>
							Sign out
						</Button>
					) : (
						<Button onClick={() => setIsAuthenticating(true)}>Sign in</Button>
					)}
					<Button variant='outline-success' onClick={save}>
						Save
					</Button>
				</div>
			</Container>
			<AuthModal
				show={isAuthenticating}
				onHide={() => setIsAuthenticating(false)}
			/>
			<AddAccount
				isAddingAccount={isAddingAccount}
				setIsAddingAccount={() => setIsAddingAccount(false)}
			/>
		</Navbar>
	);
};
