import { Table, TableCell } from '@/components/Tables';
import Tag from '@/components/Tag';
import { BorrowedCart } from '@prisma/client';

type CartStatusTableProps = {
	carts: BorrowedCart[];
};

const CartStatusTable = ({ carts }: CartStatusTableProps) => {
	const HEADERS = ['Borrrowed for', 'Issued Time', 'Status'];
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
				</tr>
			))}
		</Table>
	);
};

export default CartStatusTable;
