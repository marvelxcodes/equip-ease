'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type SignUpActionReturnType = {
	error: string | null;
};

const signUpActionPayloadSchema = z.object({
	name: z.string(),
	email: z
		.string()
		.email('Enter a Valid SST Email')
		.regex(/^[a-zA-Z0-9._]+@sst\.scaler\.com$/, 'Enter your Scaler Email'),
	password: z.string().max(20).min(6, 'Password should be atleast 6 characters')
});

export default async function signUpAction(
	_initialState: SignUpActionReturnType,
	formData: FormData
): Promise<SignUpActionReturnType> {
	const { data, success, error } = signUpActionPayloadSchema.safeParse({
		name: formData.get('name'),
		email: formData.get('email'),
		password: formData.get('password')
	});

	if (!success)
		return {
			error: error.errors[0].message
		};

	await prisma.user.create({
		data: {
			email: data.email,
			name: data.name,
			password: hashSync(data.password, 8)
		}
	});

	cookies().set(
		'auth',
		JSON.stringify({
			email: data.email,
			password: data.password
		})
	);

	redirect('/');
}
