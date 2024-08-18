import Image from 'next/image';
import prisma from '@/lib/prisma';
import getUser from '@/utils/getUser';
import Button from '@/components/Button';
import addToCartAction from '@/actions/addToCart';
import { EquipmentAvailabilityEnum } from '@prisma/client';

type AddToCartButtonProps = {
	id: number;
	availability: EquipmentAvailabilityEnum;
};

const AddToCartButton = async ({ id, availability }: AddToCartButtonProps) => {
	const user = await getUser();
	const cart = await prisma.borrowedCart.findFirst({
		where: {
			borrowStatus: 'QUEUED',
			userId: user?.id
		},
		include: {
			equipments: true
		}
	});
	const isAlreadyInCart = cart?.equipments
		.map((equipment) => equipment.id)
		.includes(id);
	return (
		<form action={addToCartAction}>
			<input
				readOnly
				name='id'
				className='hidden'
				value={id}
			/>
			<Button
				type='submit'
				disabled={isAlreadyInCart || availability === 'UNAVAILABLE'}
				className='text-xs inline-flex gap-x-1'
			>
				{isAlreadyInCart || availability === 'UNAVAILABLE'
					? 'Added to Cart'
					: 'Add to Cart'}
				<Image
					className='overflow-hidden invert rounded-md'
					src={'/icons/cart.svg'}
					height={16}
					width={16}
					alt={'cart icon'}
				/>
			</Button>
		</form>
	);
};

export default AddToCartButton;
