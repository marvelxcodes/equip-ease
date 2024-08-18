'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import getUser from '@/utils/getUser';
import { revalidatePath } from 'next/cache';

const removeFromCartActionPayloadSchema = z.object({
	id: z.number()
});

export default async function removeFromCartAction(formData: FormData) {
	const { data } = removeFromCartActionPayloadSchema.safeParse({
		id: Number(formData.get('id'))
	});
	if (data) {
		await prisma.equipments.update({
			data: {
				availability: 'AVAILABLE'
			},
			where: {
				id: data.id
			}
		});

		const user = await getUser();

		await prisma.borrowedCart.update({
			data: {
				equipments: {
					disconnect: {
						id: data.id
					}
				}
			},
			where: {
				User: {
					id: user?.id
				},
				id: user?.borrowedCarts[0]?.id || 'x'
			}
		});

		revalidatePath('/cart');
	}
}
