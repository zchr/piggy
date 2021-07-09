import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector as selector } from '../../app/hooks';
import { addInvestment } from '../reducers/AccountReducer';

interface Props {
	accountId: number;
	isAddingInvestment: boolean;
	setIsAddingInvestment: () => void;
}

export const AddInvestment = (props: Props) => {
	const dispatch = useAppDispatch();

	const { accountId, isAddingInvestment, setIsAddingInvestment } = props;
	const [investmentDate, setInvestmentDate] = useState<string>(
		new Date().toISOString().split('T')[0]
	);
	const [cashAdded, setCashAdded] = useState<number | null>(null);
	const [totalValue, setTotalValue] = useState<number | null>(null);

	const isFirstInvestment = selector(
		(state) => state.account.accounts[accountId].investments.length === 0
	);

	return (
		<>
			<Modal show={isAddingInvestment} onHide={setIsAddingInvestment}>
				<Modal.Header>
					<Modal.Title>Add investment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3'>
							<Form.Label>Investment date</Form.Label>
							<Form.Control
								type='date'
								value={investmentDate}
								onChange={(e) => {
									const raw = e.target.value;

									setInvestmentDate(raw);
								}}
							/>
							<Form.Text className='text-muted'>
								{isFirstInvestment
									? 'If you know (roughly) the total amount of cash that you have added in the lifetime of your account, you may enter it here. Otherwise, enter the total account value in both of these boxes.'
									: 'The amount of cash that you added to this account since the last investment that you recorded'}
							</Form.Text>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>Cash added</Form.Label>
							<Form.Control
								type='number'
								value={cashAdded === null ? '' : cashAdded}
								onChange={(e) => {
									const raw = e.target.value;

									if (raw !== '') {
										const newValue = parseFloat(e.target.value);
										if (!isNaN(newValue)) {
											setCashAdded(newValue);
										}
									} else {
										setCashAdded(null);
									}
								}}
							/>
							<Form.Text className='text-muted'>
								{isFirstInvestment
									? 'If you know (roughly) the total amount of cash that you have added in the lifetime of your account, you may enter it here. Otherwise, enter the total account value in both of these boxes.'
									: 'The amount of cash that you added to this account since the last investment that you recorded'}
							</Form.Text>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>New total value</Form.Label>
							<Form.Control
								type='number'
								value={totalValue === null ? '' : totalValue}
								onChange={(e) => {
									const raw = e.target.value;

									if (raw !== '') {
										const newValue = parseFloat(e.target.value);
										if (!isNaN(newValue)) {
											setTotalValue(newValue);
										}
									} else {
										setTotalValue(null);
									}
								}}
							/>
							<Form.Text className='text-muted'>
								The new total value of your account (including the cash that you
								have recently added)
							</Form.Text>
						</Form.Group>
						<Button
							variant='primary'
							type='submit'
							onClick={(e) => {
								e.preventDefault();
								dispatch(
									addInvestment({
										accountId,
										investment: {
											date: new Date(investmentDate).getTime(),
											cashAdded: cashAdded!,
											totalValue: totalValue!,
										},
									})
								);
								setIsAddingInvestment();
							}}
							disabled={cashAdded === null || totalValue === null}
						>
							Add
						</Button>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={setIsAddingInvestment}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
