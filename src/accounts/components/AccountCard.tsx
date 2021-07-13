import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { AccountMetadataState } from '../reducers/AccountReducer';
import { AddInvestment } from './AddInvestment';
import { InvestmentList } from './InvestmentList';

interface Props {
	accountId: number;
	accountMetadata: AccountMetadataState;
}

export const AccountCard = (props: Props) => {
	const { description, isCash } = props.accountMetadata;
	const accountId = props.accountId;

	const [isAddingInvestment, setIsAddingInvestment] = useState<boolean>(false);

	return (
		<>
			<Card>
				<Card.Body>
					<Card.Text>
						{description}
						<br />
						Account type: {isCash ? 'Cash' : 'Brokerage'}
					</Card.Text>
					<Button variant='primary' onClick={() => setIsAddingInvestment(true)}>
						Add investment
					</Button>
					<AddInvestment
						accountId={accountId}
						isAddingInvestment={isAddingInvestment}
						setIsAddingInvestment={() => setIsAddingInvestment(false)}
					/>
					<InvestmentList accountId={accountId} />
				</Card.Body>
			</Card>
		</>
	);
};
