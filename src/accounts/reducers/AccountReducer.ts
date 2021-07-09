import { createSlice } from "@reduxjs/toolkit";

interface AccountState {
    accounts: AccountMetadataState[];
}

export interface InvestmentState {
    date: number;
    cashAdded: number;
    totalValue: number;
}

export interface AccountMetadataState {
    name: string;
    description: string | undefined;
    isCash: boolean;
    investments: InvestmentState[];
}

const initialState: AccountState = {
    accounts: JSON.parse(localStorage.getItem('accounts') || '[]'),
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        addAccount: (state, action: { payload: { name: string, description: string | undefined, isCash: boolean } }) => {
            const accountMetadata = {
                ...action.payload,
                investments: []
            }
            state.accounts.push(accountMetadata)
        },
        addInvestment: (state, action: { payload: { accountId: number, investment: InvestmentState } }) => {
            const { accountId, investment } = action.payload;
            const investments = state.accounts[accountId].investments;

            investments.push(investment);
            investments.sort((a, b) => a.date - b.date);

            state.accounts[accountId].investments = investments;
        },
        deleteInvestment: (state, action: { payload: { accountId: number, investmentId: number } }) => {
            const { accountId, investmentId } = action.payload;
            state.accounts[accountId].investments.splice(investmentId, 1);
        }
    }
});

export const { addAccount, addInvestment, deleteInvestment } = accountSlice.actions;

export default accountSlice.reducer;