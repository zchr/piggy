import React from 'react';
import { Container } from 'react-bootstrap';
import { AddAccount } from './accounts/components/AddAccount';
import { AccountList } from './accounts/components/AccountList';
import { Nav } from './accounts/components/Nav';

function App() {
	return (
		<div>
			<Nav />
			<Container>
				<AddAccount />
				<AccountList />
			</Container>
		</div>
	);
}

export default App;
