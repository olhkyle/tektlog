import styled from '@emotion/styled';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ModalLayout from '../ModalLayout';
import { ModalDataType } from '../modalType';
import { AddPaymentFormSchema, addPaymentFormSchema } from './addPaymentFormSchema';
import { Button, CustomSelect, DatePicker, TextInput } from '../../common';
import { paymentData } from '../../../constants/financialLedger';
import { addPayment } from '../../../supabase/financialLedger';
import { useLoading } from '../../../hooks';
import { Session } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import useToastStore from '../../../store/useToastStore';
import queryKey from '../../../constants/queryKey';
import { monetizeWithWon } from '../../../utils/money';

interface AddPaymentModalProps {
	id: string;
	type: ModalDataType;
	onClose: () => void;
}

/**
 *
 * 날짜 - DatePicker
 * 사용처 - TextInput
 * 은행(카드 or 현금) - Select + Select
 * 금액 - TextInput
 */

const AddPaymentModal = ({ id, type, onClose }: AddPaymentModalProps) => {
	const queryClient = useQueryClient();
	const session = queryClient.getQueryData(['auth']) as Session;

	const {
		register,
		control,
		setValue,
		watch,
		handleSubmit,
		formState: { errors, touchedFields },
	} = useForm<AddPaymentFormSchema>({
		resolver: zodResolver(addPaymentFormSchema),
	});

	const { startTransition, Loading, isLoading } = useLoading();
	const { addToast } = useToastStore();

	const onSubmit = async (data: AddPaymentFormSchema) => {
		try {
			const today = new Date();
			await startTransition(addPayment({ ...data, user_id: session?.user?.id, price: data?.price, created_at: today, updated_at: today }));

			onClose();
			addToast({ status: 'success', message: 'Successfully add payment' });
		} catch (e) {
			console.error(e);
			addToast({ status: 'error', message: 'Error with adding payment' });
		} finally {
			queryClient.invalidateQueries({ queryKey: queryKey.FINANCIAL_LEDGER });
		}
	};

	return (
		<ModalLayout id={id} type={type} title={'Add Payment'} onClose={onClose}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Flex direction="column">
					<DatePicker
						selected={watch('usage_date')}
						setSelected={(date: Date) => setValue('usage_date', date, { shouldValidate: true })}
						error={errors['usage_date']}
					/>

					<TextInput errorMessage={errors['place']?.message}>
						<TextInput.TextField type="text" id="place" {...register('place')} placeholder="Where to use" />
					</TextInput>

					<CustomSelect
						data={paymentData.paymentMethod}
						target_id={'payment_method'}
						placeholder={'Card / Cash'}
						currentValue={watch('payment_method')}
						isTriggered={touchedFields['payment_method']!}
						error={errors['payment_method']}
						onSelect={data => setValue('payment_method', data, { shouldValidate: true, shouldTouch: true })}
					/>

					<CustomSelect
						data={paymentData.banks}
						target_id={'bank'}
						placeholder={'Select Bank'}
						currentValue={watch('payment_method') === 'Cash' ? '해당없음' : watch('bank')}
						isTriggered={watch('payment_method') === 'Cash' ? true : touchedFields['bank']!}
						error={errors['bank']}
						onSelect={data =>
							setValue('bank', watch('payment_method') === 'Cash' ? '해당없음' : data, {
								shouldValidate: watch('payment_method') === 'Cash' ? false : true,
								shouldTouch: watch('payment_method') === 'Cash' ? false : true,
							})
						}
					/>
					<Flex direction="row">
						<Controller
							name="price"
							control={control}
							render={({ field: { name, value, onChange, onBlur } }) => (
								<TextInput errorMessage={errors['price']?.message}>
									<TextInput.ControlledTextField
										type="text"
										inputMode="numeric" // 모바일에서 숫자 키패드 표시
										id="price"
										name={name}
										value={value ? monetizeWithWon(value.toString()) : ''}
										onChange={e => {
											const numericValue = e.target.value.replace(/[^0-9]/g, '');
											onChange(numericValue);
										}}
										onBlur={onBlur}
										placeholder="Price to Pay"
									/>
								</TextInput>
							)}
						/>
						<CustomSelect
							data={paymentData.priceUnits}
							target_id={'price_unit'}
							placeholder={'Unit'}
							currentValue={watch('price_unit')}
							isTriggered={touchedFields['price_unit']!}
							error={errors['price_unit']}
							onSelect={data => setValue('price_unit', data, { shouldValidate: true, shouldTouch: true })}
						/>
					</Flex>
				</Flex>

				<SubmitButton type="submit">{isLoading ? Loading : '추가하기'}</SubmitButton>
			</Form>
		</ModalLayout>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 8px;
	height: 100%;
`;

const Flex = styled.div<{ direction: 'column' | 'row' }>`
	display: flex;
	flex: 1 1 0;
	flex-direction: ${({ direction }) => direction};
	gap: 8px;
	margin-top: 8px;
`;

const SubmitButton = styled(Button)`
	padding: var(--padding-container-mobile);
	width: 100%;
	min-height: 57px;
	color: var(--white);
	background-color: var(--black);
	font-size: var(--fz-p);
	font-weight: var(--fw-semibold);

	&:active,
	&:focus {
		background-color: var(--greyOpacity900);
	}

	&:disabled {
		background-color: var(--greyOpacity400);
	}
`;

export default AddPaymentModal;
