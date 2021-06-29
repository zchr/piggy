import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '../../app/hooks';
import { addInvestment } from '../reducers/AccountReducer';

interface Props {
	accountId: number;
	isAddingInvestment: boolean;
	setIsAddingInvestment: () => void;
}

export const AddInvestment = (props: Props) => {
	const dispatch = useAppDispatch();

	const { accountId, isAddingInvestment, setIsAddingInvestment } = props;
	const [cashAdded, setCashAdded] = useState<number | null>(null);
	const [totalValue, setTotalValue] = useState<number | null>(null);

	return (
		<>
			<Modal show={isAddingInvestment} onHide={setIsAddingInvestment}>
				<Modal.Header>
					<Modal.Title>Add investment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className='mb-3'>
							<Form.Label>Cash added</Form.Label>
							<Form.Control
								type='number'
								value={cashAdded || undefined}
								onChange={(e) => {
									const newValue = parseFloat(e.target.value);
									setCashAdded(isNaN(newValue) ? null : newValue);
								}}
							/>
							<Form.Text className='text-muted'>
								The amount of cash that you added to this account since the last
								investment that you recorded
							</Form.Text>
						</Form.Group>
						<Form.Group className='mb-3'>
							<Form.Label>New total value</Form.Label>
							<Form.Control
								type='number'
								value={totalValue || undefined}
								onChange={(e) => {
									const newValue = parseFloat(e.target.value);
									setTotalValue(isNaN(newValue) ? null : newValue);
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
											dateAdded: JSON.stringify(new Date()),
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
