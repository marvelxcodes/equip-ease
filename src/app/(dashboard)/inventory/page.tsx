import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import Tag from '@/components/Tag';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Search from '@/components/Search';
import { PageProps } from '@/utils/types';
import { Table } from '@/components/Tables';
import { TableCell } from '@/components/Tables';
import { EquipmentAvailabilityEnum } from '@prisma/client';
import deleteEquipmentAction from '@/actions/deleteEquipment';

async function fetchData(pageProps: PageProps) {
	const query = pageProps.searchParams.query || '';
	const availability = pageProps.searchParams
		?.availability as EquipmentAvailabilityEnum;

	console.log(query, availability);
	const equipments = await prisma.equipments.findMany({
		where: {
			AND: [
				{
					availability
				},
				{
					name: {
						mode: 'insensitive',
						contains: query
					}
				}
			]
		}
	});
	console.log(equipments);
	return {
		equipments
	};
}

const InventoryPage = async ({ searchParams, params }: PageProps) => {
	const { equipments } = await fetchData({ searchParams, params });
	return (
		<>
			<div className='flex flex-wrap'>
				<div className='flex-1'>
					<h1 className='heading'>Equipments Inventory</h1>
					<h2 className='subheading'>
						Get all details about the Sports equipments
					</h2>
				</div>
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

				<Table headers={['Image', 'Name', 'Availability', 'Action']}>
					{equipments.map((equipment) => (
						<tr key={equipment.id}>
							<TableCell className='w-32'>
								<Image
									className='overflow-hidden rounded-md'
									src={equipment.image}
									height={60}
									width={60}
									alt={equipment.name}
								/>
							</TableCell>
							<TableCell>{equipment.name}</TableCell>
							<TableCell>
								<div className='flex gap-3 w-full justify-center'>
									{equipment.availability === 'AVAILABLE' ? (
										<Tag active>Available</Tag>
									) : (
										<Tag>Unavailable</Tag>
									)}
								</div>
							</TableCell>
							<TableCell>
								<input
									readOnly
									name='id'
									className='hidden'
									value={equipment.id}
								/>
								<Button
									formAction={deleteEquipmentAction}
									className='text-xs inline-flex gap-x-1'
								>
									Delete
									<Image
										className='overflow-hidden invert rounded-md'
										src={'/icons/delete.svg'}
										height={16}
										width={16}
										alt={''}
									/>
								</Button>
							</TableCell>
						</tr>
					))}
				</Table>
			</Card>
		</>
	);
};

export default InventoryPage;
