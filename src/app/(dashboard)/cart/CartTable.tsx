import { Table, TableCell } from '@/components/Tables';
import Tag from '@/components/Tag';
import { EquipmentAvailabilityEnum } from '@prisma/client';
import Image from 'next/image';
import RemoveFromCartButton from './RemoveFromCartButton';

type CartTableProps = {
	equipments: {
		id: number;
		name: string;
		image: string;
		borrowedCartId: string | null;
		availability: EquipmentAvailabilityEnum;
	}[];
};

const CartTable = ({ equipments }: CartTableProps) => {
	const HEADERS = ['ID', 'Image', 'Name', 'Action'];
	return (
		<Table headers={HEADERS}>
			{equipments?.map((equipment) => (
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
						<RemoveFromCartButton id={equipment.id} />
					</TableCell>
				</tr>
			))}
		</Table>
	);
};

export default CartTable;
