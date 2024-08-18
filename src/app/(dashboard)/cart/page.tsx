import prisma from '@/lib/prisma';
import CartTable from './CartTable';
import Card from '@/components/Card';
import getUser from '@/utils/getUser';
import Search from '@/components/Search';
import { PageProps } from '@/utils/types';
import { Table } from '@/components/Tables';
import CheckoutButton from './CheckoutButton';
import PageHeader from '@/components/PageHeader';
import CartStatusTable from './CartStatusTable';

async function fetchData(pageProps: PageProps) {
	const query = pageProps.searchParams.query || '';
	const user = await getUser();

	const cart = await prisma.borrowedCart.findFirst({
		where: {
			userId: user?.id,
			borrowStatus: 'QUEUED'
		},
		include: {
			equipments: true
		}
	});

	const borrowedCarts = await prisma.borrowedCart.findMany({
		where: {
			AND: [
				{
					userId: user?.id
				},
				{
					borrowStatus: {
						not: {
							equals: 'QUEUED'
						}
					}
				}
			]
		}
	});

	return {
		cart,
		borrowedCarts
	};
}

const CartPage = async ({ searchParams, params }: PageProps) => {
	const { borrowedCarts, cart } = await fetchData({ searchParams, params });
	return (
		<>
			<div className='flex flex-wrap'>
				<PageHeader
					heading='Equipments Cart'
					subheading='Add items to cart to borrow them together'
				/>
				<div>
					<CheckoutButton />
				</div>
			</div>
			<div className='flex gap-6'>
				{/* Carted Items */}
				<Card>
					<div className='py-3 px-4 items-center flex flex-wrap gap-3'>
						<h2 className='text-lg flex-1'>Your Cart</h2>
						<Search />
					</div>
					<CartTable equipments={cart?.equipments!} />
					{!cart?.equipments && (
						<div className='items-center flex flex-col py-3'>
							<span>--- Cart is Empty! ---</span>
						</div>
					)}
				</Card>

				{/* Borrow Carts status */}
				<Card>
					<div className='py-3 px-4 flex flex-wrap gap-3'>
						<h2 className='text-lg'>Requests Status</h2>
					</div>
					<CartStatusTable carts={borrowedCarts} />
					{borrowedCarts.length === 0 && (
						<div className='items-center flex flex-col py-3'>
							<span>--- There is no Requests to show! ---</span>
						</div>
					)}
				</Card>
			</div>
		</>
	);
};

export default CartPage;
