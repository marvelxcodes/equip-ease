'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function signoutAction() {
	cookies().delete('auth');
	redirect('/signin');
}
