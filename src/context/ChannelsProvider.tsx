import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { WAZZUP_API_KEY } from '../consts/wazzup';

interface IChannel {
	channelId: string;
	transport: string;
	plainId: string;
	state: string;
}

interface ChannelContextType {
	selectedChannel?: IChannel;
	handleSelectChannel?: (i: number) => void;
	channels?: IChannel[];
}

const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

export const ChannelProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [selectedChannel, setSelectedChannel] = useState<IChannel>();
	const [channels, setChannels] = useState<IChannel[]>([]);
	useEffect(() => {
		async function loadChannels() {
			const res = await fetch('https://api.wazzup24.com/v3/channels', {
				headers: {
					Authorization: `Bearer ${WAZZUP_API_KEY}`,
					'Content-Type': 'application/json',
				},
			});
		
			const channelsData: IChannel[] = await res.json();
			const filteredChannels = channelsData.filter(c => c.state === "active")
			setChannels(filteredChannels);
			setSelectedChannel(filteredChannels[0] || undefined);
		}

		loadChannels();
	}, []);

	const handleSelectChannel = (i: number) =>
		setSelectedChannel(i < channels.length ? channels[i] : undefined);


	return (
		<ChannelContext.Provider
			value={{ selectedChannel, handleSelectChannel, channels }}
		>
			{children}
		</ChannelContext.Provider>
	);
};

export const useChannel = () : ChannelContextType => {
	const context = useContext(ChannelContext);
	if (!context) {
		throw new Error('useChannel must be used within an ChannelProvider');
	}

	return context;
}
