import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import Tag from '@/components/Tag';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Search from '@/components/Search';
import { PageProps } from '@/utils/types';
import EquipmentsTable from './EquipmentsTable';
import PageHeader from '@/components/PageHeader';
import { EquipmentAvailabilityEnum } from '@prisma/client';
import getUser from '@/utils/getUser';

async function fetchData(pageProps: PageProps) {
	const query = pageProps.searchParams.query || '';
	const availability = pageProps.searchParams
		?.availability as EquipmentAvailabilityEnum;

	const equipments = await prisma.equipments.findMany({
		where: {
			AND: [
				{
					availability
				},
				{
					OR: [
						{
							id: {
								equals: Number(query) || 0
							}
						},
						{
							name: {
								mode: 'insensitive',
								contains: query
							}
						}
					]
				}
			]
		}
	});
	return {
		equipments
	};
}

const InventoryPage = async ({ searchParams, params }: PageProps) => {
	const user = await getUser();
	const { equipments } = await fetchData({ searchParams, params });
	return (
		<>
			<div className='flex flex-wrap'>
				<PageHeader
					heading='Equipments Inventory'
					subheading='Get all details about the Sports equipments'
				/>
				{user?.role === 'ADMINISTRATOR' && (
					<div>
						<Link href='/inventory/create'>
							<Button className='inline-flex items-center gap-x-1'>
								Add New Equipment
								<Image
									alt='plus'
									width={20}
									height={20}
									className='invert'
									src={'/icons/plus.svg'}
								/>
							</Button>
						</Link>
					</div>
				)}
			</div>
			<Card>
				<div className='py-3 px-4 flex flex-wrap gap-3'>
					<Search />
					<div className='flex flex-1 text-sm gap-3 items-center justify-end'>
						<Tag
							active={!searchParams.availability}
							href='/inventory'
						>
							All
						</Tag>
						<Tag
							active={searchParams.availability === 'AVAILABLE'}
							href='/inventory?availability=AVAILABLE'
						>
							Available
						</Tag>
						<Tag
							active={searchParams.availability === 'UNAVAILABLE'}
							href='/inventory?availability=UNAVAILABLE'
						>
							Unavailable
						</Tag>
					</div>
				</div>

				<EquipmentsTable equipments={equipments} />
			</Card>
		</>
	);
};

export default InventoryPage;
