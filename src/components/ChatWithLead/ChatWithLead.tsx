import useGetWazzupIframe from '../../hooks/useGetWazzupIframe';

interface IProps {
	phone: string;
}

export default function ChatWithLead({ phone }: IProps) {
	const { iframeLink } = useGetWazzupIframe(phone);

	return (
		<div
			className='iframe-wrapper'
			style={{
				height: '800px',
			}}
		>
			{iframeLink && (
				<>
					{/* <h2>Chat with contact</h2> */}
					<iframe
						src={iframeLink}
						className='iframe'
						width='100%'
						height='auto'
					/>
				</>
			)}
		</div>
	);
}
