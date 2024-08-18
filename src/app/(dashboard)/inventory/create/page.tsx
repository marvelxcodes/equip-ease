'use client';
import Image from 'next/image';
import { randomBytes } from 'crypto';
import Card from '@/components/Card';
import supabase from '@/lib/supabase';
import Alert from '@/components/Alert';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useFormState } from 'react-dom';
import { redirect } from 'next/navigation';
import addEquipmentAction from '@/actions/addEquipment';
import { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';

const InventoryCreatePage = () => {
	const [image, setImage] = useState<string | undefined>('');
	const [state, action] = useFormState(addEquipmentAction, {
		status: 'pending'
	});

	useEffect(() => {
		if (state.status === 'success') {
			redirect('/inventory');
		}
	}, [state]);

	async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
		const image = event.currentTarget.files?.item(0);
		if (image) {
			const fileExtension = image.name.split('.').pop();
			const fileName = randomBytes(20).toString('hex');

			const filePath = `${fileName}.${fileExtension}`;

			const { error } = await supabase.storage
				.from('images')
				.upload(filePath, image);

			const { data: url } = supabase.storage
				.from('images')
				.getPublicUrl(filePath);
			setImage(url.publicUrl);
		}
	}
	return (
		<>
			<div className='flex'>
				<div className='flex-1'>
					<h1 className='heading'>Create Equipments</h1>
					<h2 className='subheading'>
						Add a Equipment Listings to the Inventory
					</h2>
				</div>
			</div>

			<Card className='max-w-xl p-6 space-y-6'>
				<form
					action={action}
					className='space-y-6'
				>
					{state.status === 'error' && (
						<Alert
							title='Unable to Create Listing!'
							description={state.message}
						/>
					)}
					<Input
						required
						name='name'
						label='Name'
						placeholder="Adolf Hitler's Rifle"
					/>
					<input
						readOnly
						name='image'
						value={image}
						className='hidden'
					/>

					{/* Image Preview */}
					{image && (
						<div className=''>
							<Image
								height={200}
								width={450}
								className='w-full'
								src={image}
								alt=''
							/>
						</div>
					)}
					<label className='block space-y-2'>
						<span className='block'>Choose Equipment Picture</span>
						<input
							type='file'
							onChange={uploadImage}
							className='block w-full text-sm text-gray-500
										file:me-4 file:py-2 file:px-4
										file:rounded-lg file:border-0
										file:text-sm file:font-semibold
										file:bg-neutral-600 file:text-white
										hover:file:bg-neutral-700
										file:disabled:opacity-50 file:disabled:pointer-events-none'
						/>
					</label>
					<Button
						type='submit'
						className='w-full border border-neutral-900'
					>
						Submit
					</Button>
					<Link
						className='block w-full'
						href='/inventory'
					>
						<Button className='w-full bg-neutral-200 text-black border border-neutral-300 hover:bg-neutral-300 text-center '>
							Go Back
						</Button>
					</Link>
				</form>
			</Card>
		</>
	);
};

export default InventoryCreatePage;
