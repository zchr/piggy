import React from 'react';
import { Container } from 'react-bootstrap';
import { AddAccount } from './accounts/components/AddAccount';
import { AccountCardList } from './accounts/components/AccountCardList';
import { Counter } from './counter/Counter';

function App() {
	return (
		<div>
			<Counter />
			<Container>
				<AddAccount />
				<AccountCardList />
			</Container>
		</div>
	);
}

export default App;
