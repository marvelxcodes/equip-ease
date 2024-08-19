'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const approveActionPayloadSchema = z.object({
	id: z.string()
});

export default async function approveAction(formData: FormData) {
	const { data } = approveActionPayloadSchema.safeParse({
		id: formData.get('id')
	});
	if (data) {
		await prisma.borrowedCart.update({
			data: {
				borrowStatus: 'BORROWED'
			},
			where: {
				id: data.id
			}
		});

		revalidatePath('/');
	}
}
