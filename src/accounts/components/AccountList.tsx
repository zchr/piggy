import React from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RootState } from '../../app/store';
import { AccountMetadataState } from '../reducers/AccountReducer';
import { AccountCard } from './AccountCard';

interface Props extends StateProps {}

interface StateProps {
	accounts: AccountMetadataState[];
}

const AccountListInternal = (props: Props) => {
	const { accounts } = props;

	return (
		<Accordion>
			{accounts.map((account, i) => {
				const countInvestments = account.investments.length;
				const previousInvestment =
					countInvestments === 0
						? undefined
						: account.investments[countInvestments - 1];
				return (
					<Card key={`account-${i}`}>
						<Card.Header>
							{account.name} | {previousInvestment?.totalValue}
							<Accordion.Toggle
								as={Button}
								variant='link'
								eventKey={`account-${i}`}
							>
								View details
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey={`account-${i}`}>
							<Card.Body>
								{' '}
								<AccountCard accountId={i} accountMetadata={account} />
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				);
			})}
		</Accordion>
	);
};

const mapStateToProps = (state: RootState): StateProps => {
	return {
		accounts: state.account.accounts,
	};
};

export const AccountList = connect(mapStateToProps)(AccountListInternal);
