import { useFormState } from 'react-dom';
import SignInForm from './SignUpForm';
import Link from 'next/link';

export default function SignUpPage() {
	return (
		<>
			<div className='space-y-1 px-6 pt-6'>
				<h1 className='text-3xl font-bold'>SignUp</h1>
				<h3 className='text-sm text-neutral-500 hover:underline'>
					Already have an Account?{' '}
					<Link
						className='font-medium text-black hover:text-neutral-500'
						href='/signin'
					>
						SignIn
					</Link>
				</h3>
			</div>
			<SignInForm />
		</>
	);
}
