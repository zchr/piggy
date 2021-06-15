import { createSlice } from "@reduxjs/toolkit";

interface AccountState {
    accounts: AccountMetadataState[];
}

export interface AccountMetadataState {
    name: string;
    description: string | undefined;
    value: number;
}

const initialState: AccountState = {
    accounts: []
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        addAccount: (state, action: { payload: { name: string, description: string | undefined, value: number } }) => {
            state.accounts.push(action.payload)
        }
    }
});

export const { addAccount } = accountSlice.actions;

export default accountSlice.reducer;