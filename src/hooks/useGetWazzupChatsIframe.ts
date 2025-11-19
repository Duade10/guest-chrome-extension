import { useEffect, useMemo, useState } from "react";
import { WAZZUP_API_KEY } from "../consts/wazzup";
import { useChannel } from "../context/ChannelsProvider";


export default function useGetWazzupChatsIframe(contactPhoneNumber?: string) {
	const sanitizedPhone = useMemo(() => contactPhoneNumber?.replace(/\D/g, ""), [contactPhoneNumber]);
	const [iframeLink, setIframeLink] = useState<string>();
	// const { user } = useAuth();
	const { selectedChannel } = useChannel();

	useEffect(() => {
		async function load() {
			const body = {
				user: {
					id: '34630489239',
					name: 'Javier Morales'
				},
				scope: 'global',
				activeChat: {
					chatType: selectedChannel?.transport,
					chatId: sanitizedPhone,
					channelId: selectedChannel?.channelId
				}
			};
			try {
				const res = await fetch('https://api.wazzup24.com/v3/iframe', {
					method: 'POST',
					body: JSON.stringify(body),
					headers: {
						'Authorization': `Bearer ${WAZZUP_API_KEY}`,
						'Content-Type': 'application/json'
					}
				});
				const { url } = await res.json();
				setIframeLink(url);
			} catch (error) {
				console.error(error);
			}
		}

		load();
	}, [selectedChannel]);
	return { iframeLink };
}