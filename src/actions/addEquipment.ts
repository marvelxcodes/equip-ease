'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const addEquipmentActionPayloadSchema = z.object({
	name: z.string(),
	image: z.string()
});

type AddEquipmentActionReturnType = {
	status: 'success' | 'error' | 'pending';
	message?: string;
};

export default async function addEquipmentAction(
	_initialState: AddEquipmentActionReturnType,
	formData: FormData
): Promise<AddEquipmentActionReturnType> {
	const { data, success, error } = addEquipmentActionPayloadSchema.safeParse({
		name: formData.get('name'),
		image: formData.get('image')
	});
	if (!success)
		return {
			status: 'error',
			message: error.errors[0].message
		};

	try {
		await prisma.equipments.create({
			data: {
				name: data.name,
				image: data.image,
				availability: 'AVAILABLE'
			}
		});
		revalidatePath('/inventory');
		return {
			status: 'success'
		};
	} catch (err) {
		return {
			status: 'error',
			message: 'Database Error Occured'
		};
	}
}
