import React, { useEffect, useState } from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useAppSelector as useSelector } from '../../app/hooks';
import { AddAccount } from './AddAccount';
import firebase from '../../firebase/auth';
import { AuthModal } from '../../firebase/AuthModal';
import { useAppDispatch } from '../../app/hooks';
import { setSaveLocally } from '../reducers/AccountReducer';

interface Props {
	user: string | null;
	isAddingAccount: boolean;
	setIsAddingAccount: (val: boolean) => void;
}

export const Nav = (props: Props) => {
	const { user, isAddingAccount, setIsAddingAccount } = props;

	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const state = useSelector(state => state.account);
	const saveLocally = useSelector(state => state.account.saveLocally);

	const signOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => dispatch(setSaveLocally({ saveLocally: true })));
	};

	useEffect(() => {
		if (user && !saveLocally) {
			firebase.firestore().collection('users').doc(user).set(state);
		} else if (saveLocally) {
			localStorage.setItem('accounts', JSON.stringify(state.accounts));
		}
	}, [saveLocally, user, state]);

	return (
		<Navbar bg='light' expand='lg' className='mb-3'>
			<Container className='justify-content-between'>
				<Button variant='primary' onClick={() => setIsAddingAccount(true)}>
					Track a new account
				</Button>
				<div>
					{user ? (
						<Button
							className='mx-3'
							onClick={signOut}
							variant='outline-primary'
						>
							Sign out
						</Button>
					) : (
						<Button
							className='mx-3'
							onClick={() => setIsAuthenticating(true)}
							variant='outline-primary'
						>
							Sign in
						</Button>
					)}
					{user ? 'Syncing to your account' : 'Saving locally'}
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
