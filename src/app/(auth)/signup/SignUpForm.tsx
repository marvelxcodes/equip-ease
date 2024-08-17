'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';

const SignInForm = () => {
	return (
		<form className='w-full'>
			<div className='px-6 pb-6 space-y-3'>
				<Input
					name='name'
					type='text'
					label='Name'
					className='w-full'
					autoComplete='off'
					placeholder='Adolf Hitler'
				/>
				<Input
					name='email'
					type='email'
					label='Email'
					className='w-full'
					placeholder='username@sst.scaler.com'
				/>
				<Input
					name='password'
					type='password'
					label='Password'
					className='w-full'
					placeholder='••••••••'
				/>
			</div>
			<div className='p-6 bg-neutral-200'>
				<Button
					className='w-full'
					type='submit'
				>
					Sign In
				</Button>
			</div>
		</form>
	);
};

export default SignInForm;
