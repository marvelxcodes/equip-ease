'use client';

import Input from '@/components/Input';
import Button from '@/components/Button';
import signUpAction from '@/actions/signup';
import { useFormState } from 'react-dom';
import Alert from '@/components/Alert';

const SignUpForm = () => {
	const [state, action] = useFormState(signUpAction, {
		error: null
	});
	return (
		<form
			action={action}
			className='w-full'
		>
			<div className='px-6 mb-6'>
				{state.error && (
					<Alert
						title='SignUp Failed!'
						description={state.error}
					/>
				)}
			</div>
			<div className='px-6 pb-6 space-y-3'>
				<Input
					required
					name='name'
					type='text'
					label='Name'
					className='w-full'
					autoComplete='off'
					placeholder='I Love Adolf Hitler'
				/>
				<Input
					required
					name='email'
					type='email'
					label='Email'
					className='w-full'
					placeholder='adolfhitler@sst.scaler.com'
				/>
				<Input
					required
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
					Sign Up
				</Button>
			</div>
		</form>
	);
};

export default SignUpForm;
