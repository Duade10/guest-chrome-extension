import './App.css';
import SidePanel from './components/SidePanel';
import { ChannelProvider } from './context/ChannelsProvider';

function App() {
	return (
		<ChannelProvider>
			<SidePanel />
		</ChannelProvider>
	);
}

export default App;
