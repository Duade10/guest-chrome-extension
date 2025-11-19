import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

interface AuthContextType {
	authToken: string | null;
	setAuthToken: (token: string | null) => void;
	handleLogout: () => void;
	setUser: (val: any) => void;
	user: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [authToken, setAuthToken] = useState<string | null>(null);
	const [user, setUser] = useState<any>();

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			setUser(JSON.parse(token || ''));
			setAuthToken(token);
		}
	}, []);

	useEffect(() => {
		if (authToken) {
			localStorage.setItem('authToken', authToken);
		}
	}, [authToken]);

	const handleLogout = () => {
		localStorage.removeItem('authToken');
		setAuthToken(null);
	};

	return (
		<AuthContext.Provider
			value={{ authToken, setAuthToken, handleLogout, user, setUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
