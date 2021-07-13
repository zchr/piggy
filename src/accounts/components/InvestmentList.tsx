import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAppSelector as useSelector } from '../../app/hooks';
import { deleteInvestment } from '../reducers/AccountReducer';
import { useAppDispatch } from '../../app/hooks';
import { Graph } from '../../core/components/Graph';

interface Props {
	accountId: number;
}

export const InvestmentList = (props: Props) => {
	const dispatch = useAppDispatch();

	const { accountId } = props;

	const investments = useSelector(
		(state) => state.account.accounts[accountId].investments
	);

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
		data.length > 0
			? (data[data.length - 1].date - data[0].date) / (24 * 60 * 60 * 1000)
			: 365;
	const annualizedTwr = (1 + totalTwr) ** (365.0 / daysOfAccount) - 1;

	// Run back through the investments to calculate cumulative cash added
	for (let i = 1; i < investments.length; i++) {
		const current = data[i];
		const previous = data[i - 1];

		current.cashAdded += previous.cashAdded;
	}

	return (
		<>
			<p>Time-weighted return: {totalTwr}</p>
			<p>Annualized return: {annualizedTwr}</p>
			<Graph data={data} lines={['cashAdded', 'totalValue']} />
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th>Date</th>
						<th>Cash added</th>
						<th>Account value</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{investments.map((investment, i) => (
						<tr key={`investment-${accountId}-${i}`}>
							<td>{new Date(investment.date).toDateString()}</td>
							<td>{investment.cashAdded}</td>
							<td>{investment.totalValue}</td>
							<td>
								<Button
									onClick={() =>
										dispatch(deleteInvestment({ accountId, investmentId: i }))
									}
									variant='outline-danger'
								>
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};
