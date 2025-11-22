import useHealviChatIframe from '../../hooks/useHealviChatIframe';

export default function ChatWithLead() {
        const { iframeLink } = useHealviChatIframe();

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
