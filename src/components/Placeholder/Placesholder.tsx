import './Placeholder.css';

const Placeholder = () => {
	return (
		<div className='placeholder-container'>
			<h1 className='placeholder-title'>Attention!</h1>
			<p className='placeholder-text'>
				This browser’s page is out of the ecosystem.
			</p>
			<p
				className='placeholder-text'
				style={{
					fontSize: '1.4rem',
				}}
			>
				Please open inbox
			</p>
			<div className='placeholder__eco-wrapper'>
				<a
					href='https://dashboard.hostaway.com/v3/messages/inbox/'
					target='_blank'
					rel='noopener noreferrer'
					className='placeholder__eco-item'
				>
					Inbox
				</a>
			</div>
		</div>
	);
};

export default Placeholder;
