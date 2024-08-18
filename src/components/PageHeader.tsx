type PageHeaderProps = {
	heading: string;
	subheading: string;
};

const PageHeader = ({ heading, subheading }: PageHeaderProps) => {
	return (
		<header className='flex-1'>
			<h1 className='heading'>{heading}</h1>
			<h2 className='subheading'>{subheading}</h2>
		</header>
	);
};

export default PageHeader;
