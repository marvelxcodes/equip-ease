import Image from 'next/image';
import Tag from '@/components/Tag';
import AddToCartButton from './AddToCartButton';
import { Table, TableCell } from '@/components/Tables';
import DeleteEquipmentButton from './DeleteEquipmentButton';
import { EquipmentAvailabilityEnum } from '@prisma/client';

type EquipmentsTableProps = {
	equipments: {
		id: number;
		name: string;
		image: string;
		availability: EquipmentAvailabilityEnum;
		borrowedCartId: string | null;
	}[];
};

const EquipmentsTable = ({ equipments }: EquipmentsTableProps) => {
	const HEADER = [
		'ID',
		'Image',
		'Name',
		'Availability',
		'Add to Cart',
		'Delete'
	];
	return (
		<Table headers={HEADER}>
			{equipments.map((equipment) => (
				<tr key={equipment.id}>
					<TableCell>{equipment.id}</TableCell>
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
						<AddToCartButton
							id={equipment.id}
							availability={equipment.availability}
						/>
					</TableCell>
					<TableCell>
						<DeleteEquipmentButton id={equipment.id} />
					</TableCell>
				</tr>
			))}
		</Table>
	);
};

export default EquipmentsTable;
