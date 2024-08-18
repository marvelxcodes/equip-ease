import Image from 'next/image';
import Link from 'next/link';

type SidebarNavItemProps = {
	image: string;
	label: string;
	href: string;
};

const SidebarNavItem = ({ href, image, label }: SidebarNavItemProps) => {
	return (
		<Link
			href={href}
			className='relative group'
		>
			<Image
				className='group-hover:invert-[0.5]'
				width={24}
				height={24}
				alt={label}
				src={image}
			/>
			<span className='absolute left-full p-3 z-20 top-1/2 -translate-y-1/2 group-hover:block hidden'>
				<span className='bg-white rounded-md p-2 border '>{label}</span>
			</span>
		</Link>
	);
};

export default SidebarNavItem;
