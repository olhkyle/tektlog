import { Children, cloneElement, ForwardedRef, forwardRef, HTMLAttributes, ReactElement, useId } from 'react';
import styled from '@emotion/styled';

interface LabelInputProps extends HTMLAttributes<HTMLInputElement> {
	label: string;
	children: ReactElement;
	errorMessage?: string;
}

const LabelInput = ({ label, children, errorMessage, ...props }: LabelInputProps) => {
	const child = Children.only(children);
	const generatedId = useId();
	const id = child.props.id ?? generatedId;

	return (
		<Container {...props}>
			<label htmlFor={label} />
			{cloneElement(child, { id, ...child.props })}
			{errorMessage && <Message>{errorMessage}</Message>}
		</Container>
	);
};

interface TextFieldProps extends Omit<HTMLAttributes<HTMLInputElement>, 'size'> {
	type: 'text' | 'email' | 'password';
	name: string;
	placeholder: string;
	value?: string;
	disabled?: boolean;
}

LabelInput.TextField = forwardRef(
	({ type, id, name, placeholder, disabled, ...props }: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
		return (
			<input
				type={type}
				id={id}
				name={name}
				ref={ref}
				placeholder={placeholder}
				disabled={disabled}
				autoComplete={type === 'email' ? 'off' : 'on'}
				{...props}
			/>
		);
	},
);

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;

	label {
		display: none;
	}

	input {
		padding: var(--padding-container-mobile);
		min-width: 270px;
		border: 1px solid var(--greyOpacity100);
		border-radius: var(--radius-s);
		color: var(--black);
		font-size: var(--fz-p);
		font-weight: var(--fw-semibold);
		transition: border 0.15s ease-in-out;
	}

	input::placeholder {
		color: var(--grey600);
	}

	input:focus {
		border-color: var(--grey500);
	}
`;

const Message = styled.p`
	padding-left: 4px;
	font-size: var(--fz-sm);
	color: var(--grey400);
`;

export default LabelInput;
