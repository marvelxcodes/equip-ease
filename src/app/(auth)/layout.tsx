import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

export default function AuthLayout({ children }: PropsWithChildren) {
	return (
		<div className='w-full h-screen bg-neutral-100 flex items-center justify-center'>
			<main className='bg-white rounded-lg max-w-sm w-10/12 border space-y-6 overflow-hidden'>
				{children}
			</main>
		</div>
	);
}
