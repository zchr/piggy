import React from 'react';
import { Card } from 'react-bootstrap';
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

	const yearsOfAccount =
		data.length > 0
			? (data[data.length - 1].date - data[0].date) /
			  (365 * 24 * 60 * 60 * 1000)
			: 0;
	const annualizedTwr =
		(yearsOfAccount === 0
			? totalTwr
			: (1 + totalTwr) ** (1.0 / yearsOfAccount) - 1) * 100;

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
			<div className='row'>
				<div className='mb-3 col-sm-3'>
					<Card>
						<Card.Header>
							<div>Time-weighted return</div>
						</Card.Header>
						<Card.Body>
							<div>
								<h1>{(totalTwr * 100).toFixed(2)}%</h1>
							</div>
						</Card.Body>
					</Card>
				</div>
				<div className='mb-3 col-sm-3'>
					<Card>
						<Card.Header>
							<div>Annualized return</div>
						</Card.Header>
						<Card.Body>
							<div>
								<h1>{annualizedTwr.toFixed(2)}%</h1>
							</div>
						</Card.Body>
					</Card>
				</div>
				<div className='mb-3 col-sm-3'>
					<Card>
						<Card.Header>
							<div>Cash on hand</div>
						</Card.Header>
						<Card.Body>
							<div>
								<h1>${cash}</h1>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
			<div className='row'>
				<div className='col-sm-6'>
					<Graph
						title={'Brokerage'}
						data={data}
						lines={['cashAdded', 'totalValue']}
					/>
				</div>
				<div className='col-sm-6'>
					<Graph title={'Cash'} data={cashInvestments} lines={['totalValue']} />
				</div>
			</div>
		</>
	);
};
