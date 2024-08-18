'use server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { compareSync } from 'bcrypt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const signInActionPayloadSchema = z.object({
	email: z
		.string()
		.email('Enter a Valid Email')
		.regex(/^[a-zA-Z0-9._]+@sst\.scaler\.com$/, 'Enter your Scaler Email'),

	password: z.string().max(20).min(6, 'Password should be atleast 6 characters')
});

type SignInActionReturnType = {
	error: string | null;
};

export default async function signInAction(
	_initialState: SignInActionReturnType,
	formData: FormData
): Promise<SignInActionReturnType> {
	const { data, success, error } = signInActionPayloadSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password')
	});
	if (!success)
		return {
			error: error.errors[0].message
		};

	const user = await prisma.user.findUnique({
		where: {
			email: data.email
		}
	});

	if (!user)
		return {
			error: 'Email not found'
		};

	if (!compareSync(data.password, user.password)) {
		return {
			error: 'Entered incorrect password'
		};
	}

	cookies().set(
		'auth',
		JSON.stringify({
			email: data.email,
			password: data.password
		})
	);

	redirect('/');
}
