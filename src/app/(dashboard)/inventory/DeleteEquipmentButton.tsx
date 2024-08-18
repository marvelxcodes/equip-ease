import Image from 'next/image';
import Button from '@/components/Button';
import deleteEquipmentAction from '@/actions/deleteEquipment';

type DeleteEquipmentButtonProps = {
	id: number;
};

const DeleteEquipmentButton = ({ id }: DeleteEquipmentButtonProps) => {
	return (
		<form action={deleteEquipmentAction}>
			<input
				readOnly
				name='id'
				className='hidden'
				value={id}
			/>
			<Button
				type='submit'
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
		</form>
	);
};

export default DeleteEquipmentButton;
