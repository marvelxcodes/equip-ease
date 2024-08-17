import cn from '@/utils/cn';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type ButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

const Button = ({ className, ...props }: ButtonProps) => {
	return (
		<button
			className={cn(
				'bg-neutral-900 text-white py-2 rounded-md hover:bg-neutral-700 transition-colors px-6',
				className
			)}
			{...props}
		/>
	);
};

export default Button;
