import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import PrelineScript from '@/lib/preline';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'EquipEase - Sports Equipment Inventory Management'
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
			<PrelineScript />
		</html>
	);
}
