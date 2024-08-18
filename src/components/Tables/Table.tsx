import { ReactNode } from 'react';
import TableHeading from './TableHeading';

type TableProps = {
	headers: string[];
	children: ReactNode;
};

const Table = ({ headers, children }: TableProps) => {
	return (
		<div className='overflow-hidden border-t'>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						{headers.map((heading) => (
							<TableHeading key={heading}>{heading}</TableHeading>
						))}
					</tr>
				</thead>
				<tbody className='divide-y divide-gray-200 bg-white'>{children}</tbody>
			</table>
		</div>
	);
};

export default Table;
