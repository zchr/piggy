import React from 'react';
import { Table } from 'react-bootstrap';
import { LineChart, XAxis, YAxis, Line, Label } from 'recharts';
import { useAppSelector as useSelector } from '../../app/hooks';

interface Props {
	accountId: number;
}

export const InvestmentList = (props: Props) => {
	const { accountId } = props;

	const investments = useSelector(
		(state) => state.account.accounts[accountId].investments
	);

	const twr = (investmentId: number) => {
		if (investmentId === 0) {
			return 1;
		}

		const current = investments[investmentId];
		const previous = investments[investmentId - 1];

		return (
			1 +
			(current.totalValue - previous.totalValue - current.cashAdded) /
				(previous.totalValue + current.cashAdded)
		);
	};

	const twrs = investments.map((_, i) => twr(i));
	const totalTwr = twrs.reduce((prev, curr) => prev * curr, 1) - 1;

	const firstInvestmentDate = investments.length > 0 ? investments[0].date : 0;
	const data = investments.map((i) => {
		return {
			days: (i.date - firstInvestmentDate) / (24 * 60 * 60 * 1000),
			cashAdded: i.cashAdded,
			totalValue: i.totalValue,
		};
	});

	// Run back through the investments to calculate cumulative cash added
	for (let i = 1; i < investments.length; i++) {
		const current = data[i];
		const previous = data[i - 1];

		current.cashAdded += previous.cashAdded;
	}

	return (
		<>
			<p>Time-weighted return: {totalTwr}</p>
			<LineChart width={700} height={300} data={data} className='mb-3'>
				<XAxis dataKey='days' type='number' domain={['0', 'dataMax']}>
					<Label
						value='Days since first (tracked) investment'
						offset={0}
						position='insideBottom'
					/>
				</XAxis>
				<YAxis />
				<Line type='monotone' dataKey='cashAdded' stroke='#8884d8' />
				<Line type='monotone' dataKey='totalValue' stroke='#82ca9d' />
			</LineChart>
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th>Date</th>
						<th>Cash added</th>
						<th>Account value</th>
						<th>Time-weighted return</th>
					</tr>
				</thead>
				<tbody>
					{investments.map((investment, i) => (
						<tr key={`investment-${accountId}-${i}`}>
							<td>{new Date(investment.date).toDateString()}</td>
							<td>{investment.cashAdded}</td>
							<td>{investment.totalValue}</td>
							<td>{twrs[i]}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};
