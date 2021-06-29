import { createSlice } from "@reduxjs/toolkit";

interface AccountState {
    accounts: AccountMetadataState[];
}

export interface InvestmentState {
    dateAdded: string;
    cashAdded: number;
    totalValue: number;
}

export interface AccountMetadataState {
    name: string;
    description: string | undefined;
    investments: InvestmentState[];
}

const initialState: AccountState = {
    accounts: JSON.parse(localStorage.getItem('accounts') || '[]'),
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        addAccount: (state, action: { payload: { name: string, description: string | undefined } }) => {
            const accountMetadata = {
                ...action.payload,
                investments: []
            }
            state.accounts.push(accountMetadata)
        },
        addInvestment: (state, action: { payload: { accountId: number, investment: InvestmentState } }) => {
            const { accountId, investment } = action.payload;
            state.accounts[accountId].investments.push(investment);
        }
    }
});

export const { addAccount, addInvestment } = accountSlice.actions;

export default accountSlice.reducer;