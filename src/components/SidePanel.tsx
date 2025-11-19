import useGetInboxInfo from '../hooks/useInboxInfo';
import ChatWithLead from './ChatWithLead/ChatWithLead';
import Placeholder from './Placeholder/Placesholder';

const SidePanel = () => {
	const { conversation } = useGetInboxInfo();
	console.log('conversation', conversation);

	return (
		<div className='wrapper'>
			{!conversation && <Placeholder />}
			{conversation && (
				<div>
					<h1 style={{color : '#fff'}}>
						{conversation.Reservation.guestFirstName +
							conversation.Reservation.guestLastName}
					</h1>
					<h1 style={{color : '#fff'}}>{conversation.Reservation.phone}</h1>
					<ChatWithLead phone={conversation.Reservation.phone} />
				</div>
			)}
		</div>
	);
};

export default SidePanel;
