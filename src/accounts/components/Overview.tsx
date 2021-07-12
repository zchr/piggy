import React from 'react';
import { useAppSelector as useSelector } from '../../app/hooks';
import { Graph } from '../../core/components/Graph';
import { InvestmentState } from '../reducers/AccountReducer';

export const Overview = () => {
	const accounts = useSelector((state) =>
		state.account.accounts.filter((a) => a.investments.length > 0)
	);

	// Calculate twr across all investment accounts
	const investments = accounts
		.filter((a) => !a.isCash)
		.reduce(
			(prev: InvestmentState[], curr) => prev.concat(curr.investments),
			[]
		)
		.sort((a, b) => a.date - b.date);

	const twr = (investmentId: number) => {
		const current = investments[investmentId];
		const previousTotalValue =
			investmentId === 0 ? 0 : investments[investmentId - 1].totalValue;

		return (
			1 +
			(current.totalValue - previousTotalValue - current.cashAdded) /
				(previousTotalValue + current.cashAdded)
		);
	};

	const twrs = investments.map((_, i) => twr(i));
	const totalTwr = twrs.reduce((prev, curr) => prev * curr, 1) - 1;

	const data = investments.map((i) => {
		return {
			date: i.date,
			cashAdded: i.cashAdded,
			totalValue: i.totalValue,
		};
	});

	const daysOfAccount =
		(data[data.length - 1].date - data[0].date) / (24 * 60 * 60 * 1000);
	const annualizedTwr = (1 + totalTwr) ** (365.0 / daysOfAccount) - 1;

	// Run back through the investments to calculate cumulative cash added
	for (let i = 1; i < investments.length; i++) {
		const current = data[i];
		const previous = data[i - 1];

		current.cashAdded += previous.cashAdded;
	}

	// Calculate cash stats
	const cashAccounts = accounts.filter((a) => a.isCash);

	const cashInvestments = cashAccounts
		.reduce(
			(prev: InvestmentState[], curr) => prev.concat(curr.investments),
			[]
		)
		.sort((a, b) => a.date - b.date);

	const cash = cashAccounts
		.map((a) =>
			a.investments.length > 0
				? a.investments[a.investments.length - 1].totalValue
				: 0
		)
		.reduce((prev, curr) => prev + curr, 0);

	return (
		<>
			<div>
				<h3>Brokerage</h3>
				<p>
					Total return: {totalTwr}, (annualized: {annualizedTwr})
				</p>
				<Graph data={data} lines={['cashAdded', 'totalValue']} />
			</div>
			<div>
				<h3>Cash</h3>
				<p>Cash on hand: ${cash}</p>
				<Graph data={cashInvestments} lines={['totalValue']} />
			</div>
		</>
	);
};
