import { PropsWithChildren } from 'react';
import Sidebar from '@/components/Sidebar';

const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='flex bg-neutral-100 h-screen'>
			<Sidebar />
			<div className='overflow-y-scroll w-full flex'>
				<div className='flex-1 container mx-auto  p-6 space-y-6'>
					{children}
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
