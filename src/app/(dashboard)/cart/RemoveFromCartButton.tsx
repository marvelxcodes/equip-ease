import Image from 'next/image';
import Button from '@/components/Button';
import removeFromCartAction from '@/actions/removeFromCart';

type RemoveFromCartButtonProps = {
	id: number;
};

const RemoveFromCartButton = ({ id }: RemoveFromCartButtonProps) => {
	return (
		<form action={removeFromCartAction}>
			<input
				readOnly
				name='id'
				className='hidden'
				value={id}
			/>
			<Button
				type='submit'
				className='text-xs inline-flex gap-x-1'
			>
				Remove
				<Image
					className='overflow-hidden invert rounded-md'
					src={'/icons/delete.svg'}
					height={16}
					width={16}
					alt={'delete icon'}
				/>
			</Button>
		</form>
	);
};

export default RemoveFromCartButton;
