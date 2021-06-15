import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../app/store';
import { AccountMetadataState } from '../reducers/AccountReducer';
import { AccountCard } from './AccountCard';

interface Props extends StateProps {}

interface StateProps {
	accounts: AccountMetadataState[];
}

const AccountCardListInternal = (props: Props) => {
	return (
		<>
			{props.accounts.map((account, i) => (
				<AccountCard key={`accountCard-${i}`} accountMetadata={account} />
			))}
		</>
	);
};

const mapStateToProps = (state: RootState): StateProps => {
	return {
		accounts: state.account.accounts,
	};
};

export const AccountCardList = connect(mapStateToProps)(
	AccountCardListInternal
);
