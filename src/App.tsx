import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { AccountList } from './accounts/components/AccountList';
import { Nav } from './accounts/components/Nav';
import { Overview } from './accounts/components/Overview';
import { setState, AccountState } from './accounts/reducers/AccountReducer';
import { useAppDispatch } from './app/hooks';
import firebase from './firebase/auth';

const App = () => {
	const [user, setUser] = useState<string | null>(null);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user) {
			// see if they have any data--if so, map to state
			firebase
				.firestore()
				.collection('users')
				.doc(user)
				.onSnapshot(d => {
					if (d.exists && !d.metadata.hasPendingWrites) {
						dispatch(setState({ state: d.data() as AccountState }));
					}
				});
		}
	}, [user]);

	firebase.auth().onAuthStateChanged(user => {
		setUser(user ? user.uid : null);
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
