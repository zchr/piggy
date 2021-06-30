import React, { useState } from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useAppSelector as useSelector } from '../../app/hooks';
import { AddAccount } from './AddAccount';

export const Nav = () => {
	const [isAddingAccount, setIsAddingAccount] = useState<boolean>(false);

	const state = useSelector((state) => state.account);

	const save = (e: any) => {
		e.preventDefault();
		localStorage.setItem('accounts', JSON.stringify(state.accounts));
	};

	return (
		<Navbar bg='light' expand='lg' className='mb-3'>
			<Container className='justify-content-between'>
				<Button variant='primary' onClick={() => setIsAddingAccount(true)}>
					Add account
				</Button>
				<Button variant='outline-success' onClick={save}>
					Save
				</Button>
			</Container>
			<AddAccount
				isAddingAccount={isAddingAccount}
				setIsAddingAccount={() => setIsAddingAccount(false)}
			/>
		</Navbar>
	);
};
