'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const deleteEquipmentActionPayloadSchema = z.object({
	id: z.number()
});

export default async function deleteEquipmentAction(formData: FormData) {
	const { data } = deleteEquipmentActionPayloadSchema.safeParse({
		id: Number(formData.get('id'))
	});
	if (data) {
		await prisma.equipments.delete({
			where: {
				id: data.id
			}
		});
		revalidatePath('/inventory');
	}
}
