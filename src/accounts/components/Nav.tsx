import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useAppSelector as useSelector } from '../../app/hooks';

export const Nav = () => {
	const state = useSelector((state) => state.account);

	const save = (e: any) => {
		e.preventDefault();
		localStorage.setItem('accounts', JSON.stringify(state.accounts));
	};

	return (
		<Navbar bg='light' expand='lg'>
			<Container className='justify-content-end'>
				<Button variant='outline-success' onClick={save}>
					Save
				</Button>
			</Container>
		</Navbar>
	);
};
