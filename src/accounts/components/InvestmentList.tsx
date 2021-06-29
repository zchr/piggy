import React from 'react';
import { Table } from 'react-bootstrap';
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

	return (
		<>
			<p>Time-weighted return: {totalTwr}</p>
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
							<td>{investment.dateAdded}</td>
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
