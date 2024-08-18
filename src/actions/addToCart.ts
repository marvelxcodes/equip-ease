'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import getUser from '@/utils/getUser';
import { revalidatePath } from 'next/cache';

const addToCartActionPayloadSchema = z.object({
	id: z.number()
});

export default async function addToCartAction(formData: FormData) {
	const { data } = addToCartActionPayloadSchema.safeParse({
		id: Number(formData.get('id'))
	});
	if (data) {
		await prisma.equipments.update({
			data: {
				availability: 'UNAVAILABLE'
			},
			where: {
				id: data.id
			}
		});

		const user = await getUser();

		await prisma.borrowedCart.upsert({
			create: {
				User: {
					connect: {
						id: user?.id
					}
				},
				borrowStatus: 'QUEUED',
				allotedTime: 0,
				equipments: {
					connect: {
						id: data.id
					}
				}
			},
			update: {
				equipments: {
					connect: {
						id: data.id
					}
				}
			},
			where: {
				User: {
					id: user?.id
				},
				id: user?.borrowedCarts[0]?.id || 'ncui3eh28he',
				borrowStatus: 'QUEUED'
			}
		});

		revalidatePath('/cart');
	}
}
