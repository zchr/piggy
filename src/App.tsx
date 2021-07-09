import React from 'react';
import { Container } from 'react-bootstrap';
import { AccountList } from './accounts/components/AccountList';
import { Nav } from './accounts/components/Nav';
import { Overview } from './accounts/components/Overview';

function App() {
	return (
		<div>
			<Nav />
			<Container>
				<Overview />
				<AccountList />
			</Container>
		</div>
	);
}

export default App;
