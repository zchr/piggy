import { createSlice } from "@reduxjs/toolkit";

export interface AccountState {
    accounts: AccountMetadataState[];
    saveLocally: boolean;
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
    saveLocally: true,
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setState: (state, action: { payload: { state: AccountState } }) => {
            state.accounts = action.payload.state.accounts
        },
        setSaveLocally: (state, action: { payload: { saveLocally: boolean } }) => {
            state.saveLocally = action.payload.saveLocally;
        },
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

export const { setState, setSaveLocally, addAccount, addInvestment, deleteInvestment } = accountSlice.actions;

export default accountSlice.reducer;