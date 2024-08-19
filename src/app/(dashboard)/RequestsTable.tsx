import approveAction from '@/actions/approve';
import Button from '@/components/Button';
import { Table, TableCell } from '@/components/Tables';
import Tag from '@/components/Tag';
import { BorrowedCart } from '@prisma/client';

type RequestsTableProps = {
	carts: BorrowedCart[];
};

const RequestsTable = ({ carts }: RequestsTableProps) => {
	const HEADERS = ['Borrrowed for', 'Issued Time', 'Status', 'Action'];
	return (
		<Table headers={HEADERS}>
			{carts.map((cart) => (
				<tr key={cart.id}>
					<TableCell>{cart.allotedTime} hrs</TableCell>
					<TableCell>
						{Intl.DateTimeFormat('en', {
							hour: '2-digit',
							minute: '2-digit',
							day: '2-digit',
							month: 'short'
						}).format(cart.issuedTime)}
					</TableCell>
					<TableCell>
						<Tag
							className='mx-auto'
							active={cart.borrowStatus === 'BORROWED'}
						>
							{cart.borrowStatus}
						</Tag>
					</TableCell>
					<TableCell>
						<form action={approveAction}>
							<input
								readOnly
								name='id'
								className='hidden'
								value={cart.id}
							/>
							<Button type='submit'>Approve</Button>
						</form>
					</TableCell>
				</tr>
			))}
		</Table>
	);
};

export default RequestsTable;
