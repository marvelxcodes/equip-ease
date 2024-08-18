'use client';

import signInAction from '@/actions/signin';
import Alert from '@/components/Alert';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useFormState } from 'react-dom';

const SignInForm = () => {
	const [state, action] = useFormState(signInAction, {
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
						title='SignIn Failed!'
						description={state.error}
					/>
				)}
			</div>
			<div className='px-6 pb-6 space-y-3'>
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
					Sign In
				</Button>
			</div>
		</form>
	);
};

export default SignInForm;
