import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	type: 'button' | 'submit';
	children: ReactNode;
}

const Button = ({ type, children, ...props }: ButtonProps) => {
	return (
		<button
			type={type}
			onBlur={e => {
				e.target.blur();
			}}
			{...props}>
			{children}
		</button>
	);
};

export default Button;
