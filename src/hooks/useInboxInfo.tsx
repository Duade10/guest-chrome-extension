import { useEffect, useState } from 'react';
import { Conversation } from '../types/hostaway';

const ACCESS_TOKEN =
	'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3MDE1MSIsImp0aSI6IjEzZTJkZTdlYzFlZTRiYjE5ZWI5MGQ3OGVmNDE0NzdiNDhiZTc2MTcxZDgxMWFiNDY3OTY0YzdiODU0ZjRiYzRlZGI3NzlkNTRlYzA0MzEzIiwiaWF0IjoxNzQ2NDQ1MDI4LjUyMjU3OCwibmJmIjoxNzQ2NDQ1MDI4LjUyMjU4LCJleHAiOjIwNjE5Nzc4MjguNTIyNTgzLCJzdWIiOiIiLCJzY29wZXMiOlsiZ2VuZXJhbCJdLCJzZWNyZXRJZCI6NjI2NzB9.c1F13g1rVxBZgrnNB6kTqAOM0GR61NHzXnqx-65WZtcMKUymGELxPBRaebtXm2U3ox0eQF4WAfzRB9jAQNRY-ngASrMvJL2_K01Io7ztf1n8fRJxDBOTHeEtFqvhN80oBrW1ubyivuNNgztXAydvBCUJkWAtyfKv6y-VMEyB_2GeTgM-_yXcUWEMRxX8APijBT3e95JXTqdBnGH-mKzJEvENzvRDHtjLJnWTaP2CFOSAnu96K-qbuNHc4dp5F1nm3oxDzDu-jANdkgIL9voguJS428hE0h2YdspzrTXOYVTvxKTGOJQbiab5wTHsyaYiucxOeMqAGl2bKaQGjXpi6A';

interface IApiResponse {
	count: number;
	limit: number;
	offset: number;
	page: number;
	result: Conversation[];
	status: 'success' | string;
	totalPages: number;
}
export default function useGetInboxInfo() {
	const [url, setUrl] = useState<string>('Loading...');
	const [conversation, setConversation] = useState<Conversation>();
	const [isLoading, setIsLoading] = useState<boolean>();

	useEffect(() => {
		// Fetch the current tab's URL on load
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			const currentTab = tabs[0];
			if (currentTab && currentTab.url) {
				setUrl(currentTab.url);
			}
		});

		// Listen for messages from the background script
		const handleMessage = (message: { type: string; url: string }) => {
			if (message.type === 'TAB_UPDATED') {
				setConversation(undefined);
				setUrl(message.url);
			}
		};

		chrome.runtime.onMessage.addListener(handleMessage);

		// Cleanup listener on component unmount
		return () => chrome.runtime.onMessage.removeListener(handleMessage);
	}, []);

	useEffect(() => {
		setIsLoading(false);
		setConversation(undefined);
		if (url.startsWith('https://dashboard.hostaway.com/v3/messages/inbox/')) {
			const id = url.split('/').filter(Boolean).at(-1);
			async function load() {
				setIsLoading(true);
				const res = await fetch(
					`https://api.hostaway.com/v1/reservations/${id}/conversations`,
					{
						method: 'GET',

						headers: {
							'content-type': 'application/json',
							Authorization: `Bearer ${ACCESS_TOKEN}`,
							'Cache-control': 'no-cache',
						},
					}
				);
				const data: IApiResponse = await res.json();
				setConversation(data.result[0]);
				setIsLoading(false);
			}
			load();
		}
		setIsLoading(false);
	}, [url]);

	return { url, conversation, loading: isLoading };
}
