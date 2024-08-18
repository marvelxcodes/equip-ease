import cn from '@/utils/cn';
import React, { DetailedHTMLProps, ThHTMLAttributes } from 'react';

type TableHeadingProps = DetailedHTMLProps<
	ThHTMLAttributes<HTMLTableCellElement>,
	HTMLTableCellElement
>;

const TableHeading = ({ className, ...props }: TableHeadingProps) => {
	return (
		<th
			scope='col'
			className={cn(
				'px-6 py-3 text-center first:text-start text-xs font-medium text-gray-500 uppercase',
				className
			)}
			{...props}
		/>
	);
};

export default TableHeading;
