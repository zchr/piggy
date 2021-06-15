import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AccountReducer from '../accounts/reducers/AccountReducer';
import counterReducer from '../counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: AccountReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
