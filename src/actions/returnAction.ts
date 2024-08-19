'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const returnActionPayloadSchema = z.object({
	id: z.string()
});

export default async function returnAction(formData: FormData) {
	const { data } = returnActionPayloadSchema.safeParse({
		id: formData.get('id')
	});
	if (data) {
		await prisma.borrowedCart.update({
			data: {
				borrowStatus: 'RETURNED',
				equipments: {
					updateMany: {
						data: {
							availability: 'AVAILABLE'
						},
						where: {
							availability: 'UNAVAILABLE'
						}
					}
				}
			},
			where: {
				id: data.id
			}
		});

		revalidatePath('/');
		revalidatePath('/equipments');
	}
}
