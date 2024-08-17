import { DetailedHTMLProps, InputHTMLAttributes, useId } from 'react';

type InputType = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
> & {
	label: string;
};

const Input = ({ label, className, ...props }: InputType) => {
	const id = useId();
	return (
		<div className={'' + className}>
			<label
				className='block mb-1'
				htmlFor={id}
			>
				{label}
			</label>
			<input
				id={id}
				className={
					'focus:border-neutral-600 text-sm focus:outine outline-2 w-full rounded-md border px-3 py-2'
				}
				{...props}
			/>
		</div>
	);
};

export default Input;
