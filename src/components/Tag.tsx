import cn from '@/utils/cn';
import Link from 'next/link';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type TagProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	href?: string;
	active?: boolean;
	children: String;
};

const Tag = ({ active, className, href, children }: TagProps) => {
	if (!href) {
		return (
			<div
				className={cn(
					'bg-neutral-400 w-max h-max text-white px-3  cursor-default rounded-full py-1',
					active && 'bg-neutral-900',
					className
				)}
			>
				{children}
			</div>
		);
	}

	return (
		<Link
			href={href!}
			className={cn(
				'bg-neutral-400 w-max text-white h-max px-3 hover:bg-neutral-700 cursor-pointer rounded-full py-1',
				active && 'bg-neutral-900',
				className
			)}
		>
			{children}
		</Link>
	);
};

export default Tag;
