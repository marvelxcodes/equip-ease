import cn from '@/utils/cn';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type CardProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

const Card = ({ className, ...props }: CardProps) => {
	return (
		<div
			className={cn(
				'w-full bg-white overflow-hidden rounded-lg border',
				className
			)}
			{...props}
		/>
	);
};

export default Card;
