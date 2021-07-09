import React from 'react';
import { LineChart, XAxis, YAxis, Line, Label } from 'recharts';
import { useAppSelector as useSelector } from '../../app/hooks';
import { InvestmentState } from '../reducers/AccountReducer';

export const Overview = () => {
	const cashAccounts = useSelector((state) =>
		state.account.accounts.filter((a) => a.isCash)
	);

	const investments = cashAccounts
		.reduce(
			(prev: InvestmentState[], curr) => prev.concat(curr.investments),
			[]
		)
		.sort((a, b) => a.date - b.date);

	const firstInvestmentDate = investments.length > 0 ? investments[0].date : 0;
	const data = investments.map((i) => {
		return {
			days: (i.date - firstInvestmentDate) / (24 * 60 * 60 * 1000),
			totalValue: i.totalValue,
		};
	});

	const cash = cashAccounts
		.map((a) =>
			a.investments.length > 0
				? a.investments[a.investments.length - 1].totalValue
				: 0
		)
		.reduce((prev, curr) => prev + curr, 0);

	return (
		<>
			<h3>Cash</h3>
			<p>Cash on hand: ${cash}</p>
			<LineChart width={700} height={300} data={data} className='mb-3'>
				<XAxis dataKey='days' type='number' domain={['0', 'dataMax']}>
					<Label value='Days' offset={0} position='insideBottom' />
				</XAxis>
				<YAxis />
				<Line type='monotone' dataKey='totalValue' stroke='#8884d8' />
			</LineChart>
		</>
	);
};
