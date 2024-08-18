import signoutAction from '@/actions/signout';
import Button from '@/components/Button';
import Link from 'next/link';

export default function SignOutPage() {
	return (
		<>
			<div className='space-y-1 px-6 pt-6'>
				<h1 className='text-3xl font-bold'>SignOut</h1>
				<h3 className='text-sm text-neutral-500'>
					Clicked By Mistake?{' '}
					<Link
						className='font-medium text-black hover:text-neutral-500 hover:underline'
						href='/'
					>
						Open Dashboard
					</Link>
				</h3>
			</div>
			<div className='p-6 bg-neutral-200'>
				<form action={signoutAction}>
					<Button
						type='submit'
						className='w-full'
					>
						Sign Out
					</Button>
				</form>
			</div>
		</>
	);
}
