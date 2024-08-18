import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';

export default async function getUser() {
	const userCredentials = JSON.parse(cookies().get('auth')?.value!);

	const user = await prisma.user.findUnique({
		where: {
			email: userCredentials.email
		},
		include: {
			borrowedCarts: true
		}
	});

	return user;
}
