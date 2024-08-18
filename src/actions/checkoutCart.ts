'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import getUser from '@/utils/getUser';
import { revalidatePath } from 'next/cache';

const checkoutCartActionPayloadSchema = z.object({
	allottedTime: z.number()
});

export default async function CheckoutCartAction(formData: FormData) {
	const { data } = checkoutCartActionPayloadSchema.safeParse({
		allottedTime: Number(formData.get('allotted-time'))
	});
	if (data) {
		const user = await getUser();
		const cart = await prisma.borrowedCart.findFirst({
			where: {
				userId: user?.id,
				borrowStatus: 'QUEUED'
			}
		});

		await prisma.borrowedCart.update({
			data: {
				allotedTime: data.allottedTime,
				borrowStatus: 'REQUESTED'
			},
			where: {
				id: cart?.id
			}
		});

		revalidatePath('/cart');
	}
}
