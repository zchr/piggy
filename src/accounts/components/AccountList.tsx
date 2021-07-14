import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RootState } from '../../app/store';
import { AccountMetadataState } from '../reducers/AccountReducer';
import { AccountCard } from './AccountCard';
import { AddInvestment } from './AddInvestment';

interface Props extends StateProps {}

interface StateProps {
	accounts: AccountMetadataState[];
}

const AccountListInternal = (props: Props) => {
	const { accounts } = props;

	const [accountId, setAccountId] = useState<number | undefined>(undefined);
	const [isAddingInvestment, setIsAddingInvestment] = useState<boolean>(false);

	const lastInvestments = accounts.map((a) =>
		a.investments.length === 0
			? undefined
			: a.investments[a.investments.length - 1]
	);

	const getLastInvestmentDate = (date: number | undefined): string =>
		date === undefined ? '' : new Date(date).toLocaleDateString();

	return (
		<>
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th>Account</th>
						<th>Type</th>
						<th>Value</th>
						<th>Last update</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{accounts.map((account, i) => (
						<tr key={`account-${i}`}>
							<td>{account.name}</td>
							<td>{account.isCash ? 'Cash' : 'Brokerage'}</td>
							<td>${lastInvestments[i]?.totalValue}</td>
							<td>{getLastInvestmentDate(lastInvestments[i]?.date)}</td>
							<td>
								<Button
									onClick={() => {
										setAccountId(i);
										setIsAddingInvestment(true);
									}}
									variant='primary'
								>
									Update
								</Button>
								<Button
									className='mx-3'
									onClick={() => setAccountId(i)}
									variant='outline-primary'
								>
									Details
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			{!isAddingInvestment && (
				<AccountCard
					accountId={accountId}
					account={accountId === undefined ? undefined : accounts[accountId]}
					setIsShowingAccountDetails={() => setAccountId(undefined)}
				/>
			)}
			{accountId !== undefined && (
				<AddInvestment
					accountId={accountId}
					isAddingInvestment={isAddingInvestment}
					setIsAddingInvestment={() => {
						setIsAddingInvestment(false);
						setAccountId(undefined);
					}}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state: RootState): StateProps => {
	return {
		accounts: state.account.accounts,
	};
};

export const AccountList = connect(mapStateToProps)(AccountListInternal);
