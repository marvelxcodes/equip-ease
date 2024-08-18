import cn from '@/utils/cn';
import { DetailedHTMLProps, ThHTMLAttributes } from 'react';

type TableCellProps = DetailedHTMLProps<
	ThHTMLAttributes<HTMLTableCellElement>,
	HTMLTableCellElement
>;

const TableCell = ({ className, ...props }: TableCellProps) => {
	return (
		<td
			scope='col'
			className={cn(
				'px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800',
				className
			)}
			{...props}
		/>
	);
};

export default TableCell;
