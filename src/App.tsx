import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { AccountList } from './accounts/components/AccountList';
import { Nav } from './accounts/components/Nav';
import { Overview } from './accounts/components/Overview';
import firebase from './firebase/auth';

const App = () => {
	const [user, setUser] = useState<firebase.User | null>(null);

	firebase.auth().onAuthStateChanged(user => {
		setUser(user);
	});
	return (
		<div>
			<Nav user={user} />
			<Container>
				<Overview />
				<AccountList />
			</Container>
		</div>
	);
};

export default App;
