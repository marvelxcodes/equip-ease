import Image from 'next/image';
import SidebarNavItem from './SidebarNavItem';

const Sidebar = () => {
	return (
		<aside className='flex flex-col bg-white  border-r'>
			<div className='p-4 bg-neutral-200'>
				<Image
					src={'/logo.png'}
					className='h-8 w-8 grayscale contrast-125'
					height={60}
					width={60}
					alt=''
				/>
			</div>
			<nav className='flex-1 p-4 my-6 flex gap-8 flex-col items-center'>
				<SidebarNavItem
					href='/'
					label='Home'
					image='/icons/home.svg'
				/>
				<SidebarNavItem
					href='/inventory'
					label='Inventory'
					image='/icons/dashboard.svg'
				/>
				<SidebarNavItem
					href='/cart'
					image='/icons/cart.svg'
					label='Cart'
				/>
				<SidebarNavItem
					href='/announcements'
					image='/icons/announcements.svg'
					label='Announcements'
				/>
			</nav>
			<div className='p-4 flex flex-col gap-8'>
				<SidebarNavItem
					href='/settings'
					image='/icons/settings.svg'
					label='Settings'
				/>
				<SidebarNavItem
					href='/signout'
					image='/icons/signout.svg'
					label='SignOut'
				/>
			</div>
		</aside>
	);
};

export default Sidebar;
