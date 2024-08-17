import { useFormState } from 'react-dom';
import SignInForm from './SignInForm';
import Link from 'next/link';

export default function SignInPage() {
	return (
		<>
			<div className='space-y-1 px-6 pt-6'>
				<h1 className='text-3xl font-bold'>SignIn</h1>
				<h3 className='text-sm text-neutral-500'>
					Don&apos;t have an Account?{' '}
					<Link
						className='font-medium text-black hover:text-neutral-500  hover:underline'
						href='/signup'
					>
						SignUp
					</Link>
				</h3>
			</div>
			<SignInForm />
		</>
	);
}
