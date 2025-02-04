import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaWonSign } from 'react-icons/fa6';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { Button } from '../components';
import { useLoading } from '../hooks';
import { format } from '../utils/date';
import { monetizeWithSeparator } from '../utils/money';
import { removePayment } from '../supabase/financialLedger';
import useToastStore from '../store/useToastStore';
import { useQueryClient } from '@tanstack/react-query';
import queryKey from '../constants/queryKey';
import { routes } from '../constants';

const FinancialLedgerItemPage = () => {
	const queryClient = useQueryClient();
	const {
		state: { payment, currentDate },
	} = useLocation();

	const { Loading, isLoading, startTransition } = useLoading();
	const { addToast } = useToastStore();
	const navigate = useNavigate();

	const handlePaymentDelete = async () => {
		try {
			await startTransition(removePayment({ id: payment.id }));

			addToast({ status: 'success', message: 'Successfully Delete' });
			navigate(routes.FINANCIAL_LEDGER, { state: { currentDate } });
		} catch (e) {
			console.error(e);
			addToast({ status: 'error', message: 'Error with deleting payment' });
		} finally {
			queryClient.invalidateQueries({ queryKey: [...queryKey.FINANCIAL_LEDGER, currentDate] });
		}
	};

	return (
		<Container>
			<MainContent>
				<PaymentMethod>
					<WonIconWrapper>
						{payment.payment_method === 'Card' ? <BsFillCreditCardFill size="14" /> : <FaWonSign size="14" />}
					</WonIconWrapper>
					<span>{payment.payment_method}</span>
				</PaymentMethod>
				<Price>
					<span>
						{monetizeWithSeparator(payment.priceIntegerPart)}
						{payment.priceDecimalPart.length ? `.${payment.priceDecimalPart}` : ''}
					</span>
					<span>{payment.price_unit}</span>
				</Price>
			</MainContent>

			<Detail>
				<div>
					<dt>사용처</dt>
					<dd>{payment.place}</dd>
				</div>
				<div>
					<dt>은행</dt>
					<dd>{payment.bank}</dd>
				</div>
				<div>
					<dt>결제일시</dt>
					<dd>{format(currentDate)}</dd>
				</div>
			</Detail>

			<DeleteButton type="button" onClick={handlePaymentDelete}>
				{isLoading ? Loading : '삭제하기'}
			</DeleteButton>
		</Container>
	);
};

const Container = styled.section`
	position: relative;
	display: flex;
	flex-direction: column;
	height: calc(100dvh - 3 * var(--nav-height));
`;

const MainContent = styled.div``;

const PaymentMethod = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	margin-top: 32px;

	span {
		font-weight: var(--fw-semibold);
	}
`;

const WonIconWrapper = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	padding: calc(var(--padding-container-mobile) * 0.35);
	color: var(--white);
	background-color: var(--grey800);
	border-radius: var(--radius-m);
`;

const Price = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: var(--fz-h4);
	font-weight: var(--fw-bold);
`;

const Detail = styled.dl`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: calc(var(--padding-container-mobile) * 3) 0;

	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	dt {
		font-weight: var(--fw-medium);
		color: var(--grey800);
	}

	dd {
		font-size: var(--fz-h7);
		font-weight: var(--fw-semibold);
	}
`;

const DeleteButton = styled(Button)`
	position: absolute;
	bottom: 0;
	padding: var(--padding-container-mobile);
	width: 100%;
	min-height: 57px;
	font-size: var(--fz-p);
	font-weight: var(--fw-semibold);
	color: var(--white);
	background-color: var(--black);

	&:focus {
		background-color: var(--grey900);
	}
`;

export default FinancialLedgerItemPage;
