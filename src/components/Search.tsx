'use client';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Search = () => {
	const router = useRouter();

	function searchChangeHandler(event: ChangeEvent<HTMLInputElement>) {
		router.push(`?query=${event.currentTarget.value}`);
	}
	return (
		<div className='relative max-w-sm w-full min-w-48'>
			<label
				htmlFor='hs-table-search'
				className='sr-only'
			>
				Search
			</label>
			<input
				onChange={searchChangeHandler}
				type='text'
				id='hs-table-search'
				className='py-2 px-3 ps-9 block w-full border shadow-sm rounded-lg text-sm focus:z-10 focus:border-neu-500 focus:ring-neu-500 disabled:opacity-50 disabled:pointer-events-none'
				placeholder='Search for equipments'
			/>
			<div className='absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3'>
				<Image
					className='overflow-hidden invert-[0.5] rounded-md'
					src={'/icons/search.svg'}
					height={20}
					width={20}
					alt={''}
				/>
			</div>
		</div>
	);
};

export default Search;
