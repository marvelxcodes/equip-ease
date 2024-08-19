import Tag from '@/components/Tag';
import Button from '@/components/Button';
import approveAction from '@/actions/approve';
import { BorrowedCart } from '@prisma/client';
import { Table, TableCell } from '@/components/Tables';
import Image from 'next/image';
import returnAction from '@/actions/returnAction';

type OverdueTableProps = {
	carts: BorrowedCart[];
};

const OverdueTable = ({ carts }: OverdueTableProps) => {
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
						<form action={returnAction}>
							<input
								readOnly
								name='id'
								className='hidden'
								value={cart.id}
							/>
							<Button
								className='inline-flex items-center gap-1'
								type='submit'
							>
								Retured
								<Image
									className='overflow-hidden invert rounded-md'
									src={'/icons/tick.svg'}
									height={16}
									width={16}
									alt={'tick icon'}
								/>
							</Button>
						</form>
					</TableCell>
				</tr>
			))}
		</Table>
	);
};

export default OverdueTable;
