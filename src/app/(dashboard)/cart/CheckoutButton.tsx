'use client';
import Image from 'next/image';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import CheckoutCartAction from '@/actions/checkoutCart';

const CheckoutButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { pending, data } = useFormStatus();
	useEffect(() => {
		if (!pending && data) {
			setIsOpen(false);
		}
	}, [pending, data]);
	return (
		<>
			<Button
				type='button'
				onClick={() => setIsOpen(true)}
				className='inline-flex items-center gap-x-1'
			>
				Checkout
				<Image
					alt='tick'
					width={20}
					height={20}
					className='invert'
					src={'/icons/tick.svg'}
				/>
			</Button>
			{isOpen && (
				<div
					onClick={() => setIsOpen(false)}
					className='backdrop-blur h-screen w-screen top-0 left-0 fixed z-30 flex items-center justify-center'
				>
					<form
						onClick={(e) => e.stopPropagation()}
						className=' bg-white max-w-sm  border space-y-6 overflow-hidden rounded-lg w-10/12'
						action={CheckoutCartAction}
					>
						<h2 className='p-6 pb-0 text-xl font-semibold'>Checkout Cart</h2>
						<div className='px-6 flex items-center gap-x-3'>
							<Input
								required
								name='time'
								type='number'
								label='Allotted Time'
								className='w-full'
								placeholder='5'
							/>
							<span className='mt-7'>Hours</span>
						</div>
						<div className='p-6 bg-neutral-200'>
							<Button
								type='submit'
								disabled={pending}
								className='w-full'
							>
								Checkout
							</Button>
						</div>
					</form>
				</div>
			)}
		</>
	);
};

export default CheckoutButton;
