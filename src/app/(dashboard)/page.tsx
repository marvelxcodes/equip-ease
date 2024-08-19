import OverdueTable from './OverdueTable';
import Card from '@/components/Card';
import PageHeader from '@/components/PageHeader';
import prisma from '@/lib/prisma';
import getUser from '@/utils/getUser';
import RequestsTable from './RequestsTable';
import Alert from '@/components/Alert';

async function fetchData() {
	const user = await getUser();
	const borrowrequests = await prisma.borrowedCart.findMany({
		where: {
			borrowStatus: {
				equals: 'REQUESTED'
			}
		}
	});
	const overdue = await prisma.borrowedCart.findMany({
		where: {
			AND: [
				{
					borrowStatus: {
						equals: 'BORROWED'
					}
				}
			]
		}
	});
	return { borrowrequests, user, overdue };
}

export default async function Home() {
	const { user, borrowrequests, overdue } = await fetchData();
	return (
		<>
			<div className='flex'>
				<PageHeader
					heading='Dashboard'
					subheading='Get a Overview of Everything'
				/>
			</div>
			{user?.role === 'ADMINISTRATOR' ? (
				<div className='flex flex-wrap gap-6'>
					<Card>
						<div className='py-3 px-4 items-center flex flex-wrap gap-3'>
							<h2 className='text-lg flex-1'>Overdue Products</h2>
						</div>
						<OverdueTable carts={overdue} />
					</Card>
					<Card>
						<div className='py-3 px-4 items-center flex flex-wrap gap-3'>
							<h2 className='text-lg flex-1'>Borrow Requests</h2>
						</div>
						<RequestsTable carts={borrowrequests} />
					</Card>
				</div>
			) : (
				<Card>
					<Alert
						title='Unauthorized'
						description={`You don't have access to this page`}
					/>
				</Card>
			)}
		</>
	);
}
