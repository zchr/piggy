import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AccountMetadataState } from '../reducers/AccountReducer';
import { AddInvestment } from './AddInvestment';
import { InvestmentList } from './InvestmentList';

interface Props {
	accountId: number | undefined;
	account: AccountMetadataState | undefined;
	setIsShowingAccountDetails: () => void;
}

export const AccountCard = (props: Props) => {
	const { accountId, account, setIsShowingAccountDetails } = props;

	const [isAddingInvestment, setIsAddingInvestment] = useState<boolean>(false);

	const isShowingAccountDetails = accountId !== undefined;

	return account === undefined || accountId === undefined ? (
		<></>
	) : (
		<>
			<Modal show={isShowingAccountDetails} onHide={setIsShowingAccountDetails}>
				<Modal.Header>
					<Modal.Title>{account.name}</Modal.Title>
					<Button
						variant='outline-success'
						onClick={() => setIsAddingInvestment(true)}
					>
						Add investment
					</Button>
					<Button variant='link' onClick={setIsShowingAccountDetails}>
						Close
					</Button>
				</Modal.Header>
				<Modal.Body>
					<p>{account.description}</p>
					<InvestmentList accountId={accountId!} />
				</Modal.Body>
			</Modal>
			<AddInvestment
				accountId={accountId}
				isAddingInvestment={isAddingInvestment}
				setIsAddingInvestment={() => setIsAddingInvestment(false)}
			/>
		</>
	);
};
