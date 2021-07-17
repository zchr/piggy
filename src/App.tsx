import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { AccountList } from './accounts/components/AccountList';
import { Nav } from './accounts/components/Nav';
import { Overview } from './accounts/components/Overview';
import {
	setState,
	AccountState,
	setSaveLocally,
} from './accounts/reducers/AccountReducer';
import { useAppDispatch, useAppSelector as useSelector } from './app/hooks';
import firebase from './firebase/auth';

const App = () => {
	const [user, setUser] = useState<string | null>(null);
	const [isAddingAccount, setIsAddingAccount] = useState<boolean>(false);
	const hasAccounts = useSelector(state => state.account.accounts.length > 0);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (user) {
			dispatch(setSaveLocally({ saveLocally: false }));

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
	}, [user, dispatch]);

	firebase.auth().onAuthStateChanged(user => {
		setUser(user ? user.uid : null);
	});

	return (
		<div>
			<Nav
				user={user}
				isAddingAccount={isAddingAccount}
				setIsAddingAccount={setIsAddingAccount}
			/>
			<Container>
				{hasAccounts ? (
					<>
						<Overview />
						<AccountList />
					</>
				) : (
					<>
						<div className='p-5 mb-4 bg-light rounded-3'>
							<div className='container-fluid py-5'>
								<h1 className='display-5 fw-bold'>Stay on top of your money</h1>
								<p className='col-md-8 fs-4'>
									Piggy gives you a bird's eye view of where your money is. Sync
									your data to an account, or save it locally&mdash;right in
									your browser.
								</p>
								<button
									className='btn btn-primary btn-lg'
									type='button'
									onClick={() => setIsAddingAccount(true)}
								>
									Add your first account
								</button>
							</div>
						</div>
						<div className='row mb-4'>
							<div className='col-md-3'>
								<h2>See how your accounts perform</h2>
							</div>
							<div className='col-md-9'>
								<img
									alt={'Overview panel with account statistics'}
									className='w-100'
									src={`${window.location}/overview.png`}
								/>
								<img
									alt={'Graphs showing account performance overtime'}
									className='w-100'
									src={`${window.location}/graphs.png`}
								/>
							</div>
						</div>
						<div className='row align-items-md-stretch mb-4'>
							<div className='col-md-6'>
								<div className='h-100 p-5 text-white bg-dark rounded-3'>
									<h2>What we do</h2>
									<p>
										Piggy helps you track your overall account balances and
										investment growth. We'll track how much cash you have and
										your anualized / time-weighted returns
									</p>
									<button
										className='btn btn-outline-light'
										type='button'
										onClick={() => setIsAddingAccount(true)}
									>
										Get started with Piggy
									</button>
								</div>
							</div>
							<div className='col-md-6'>
								<div className='h-100 p-5 bg-light border rounded-3'>
									<h2>We're not another Mint</h2>
									<p>
										Piggy does not analyze individual transactions or
										characterize your spending habbits.
									</p>
								</div>
							</div>
						</div>
					</>
				)}
			</Container>
		</div>
	);
};

export default App;
