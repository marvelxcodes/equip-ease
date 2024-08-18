import Image from 'next/image';

type AlertProps = {
	title: string;
	description?: string;
};

const Alert = ({ title, description }: AlertProps) => {
	return (
		<div className='rounded-md p-2 border flex gap-x-3'>
			<div className='items-center flex'>
				<Image
					height={30}
					width={30}
					src={'/icons/error.svg'}
					alt='exclamation circle'
				/>
			</div>
			<div className='flex-1'>
				<span className='block font-semibold'>{title}</span>
				<span className='block text-sm'>{description}</span>
			</div>
		</div>
	);
};

export default Alert;
