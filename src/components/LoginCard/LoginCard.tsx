import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import './LoginCard.css'; // Import external CSS file

const LoginCard: React.FC = () => {
	const { setAuthToken, setUser } = useAuth();

	// State to track email, password, new password
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const [step, setStep] = useState<'email' | 'login' | 'newPassword'>('email');

	// Handle email submission
	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const res = await fetch(
			'https://extension.speakuplondon.com:8000/auth/check_email',
			{
				method: 'POST',
				body: JSON.stringify({
					email,
				}),
				headers: {
					'content-type': 'application/json',
				},
			}
		);

		if (res.status === 200) {
			setStep('login'); // Ask for password
		} else if (res.status === 400) {
			setStep('newPassword'); // Ask for new password
		}
	};

	// Handle login with password
	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await fetch(
			'https://extension.speakuplondon.com:8000/auth/login',
			{
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
				}),
				headers: {
					'content-type': 'application/json',
				},
			}
		);

		const data = await res.json();
		if (res.ok) {
			setUser(data);
			const fakeToken = JSON.stringify(data);
			setAuthToken(fakeToken);
		}
	};

	const handleNewPassword = async (e: React.FormEvent) => {
		e.preventDefault();

		await fetch('https://extension.speakuplondon.com:8000/auth/add_password', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				'content-type': 'application/json',
			},
		});

		setStep('login'); // Redirect to login step
	};

	return (
		<div className='login-page'>
			<div className='login-message'>
				<p className='title'>🔐 To proceed, you need to log in.</p>
				<p className='subtitle'>
					Access your account to manage leads and track communication
					seamlessly.
				</p>
				<div className='login-card'>
					<h3>
						{step === 'email'
							? 'Enter Email'
							: step === 'login'
							? 'Enter Password'
							: 'Set New Password'}
					</h3>

					{step === 'email' && (
						<form onSubmit={handleEmailSubmit}>
							<div className='input-group'>
								<label>Email</label>
								<input
									type='text'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									name='email'
									className='styled-input'
								/>
							</div>
							<button type='submit' className='login-btn'>
								Continue
							</button>
						</form>
					)}

					{step === 'login' && (
						<form onSubmit={handleLogin}>
							<div className='input-group'>
								<label>Password</label>
								<input
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									name='password'
									className='styled-input'
								/>
							</div>
							<button type='submit' className='login-btn'>
								Login
							</button>
						</form>
					)}

					{step === 'newPassword' && (
						<form onSubmit={handleNewPassword}>
							<div className='input-group'>
								<label>New Password</label>
								<input
									type='password'
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									required
									name='newPassword'
									className='styled-input'
								/>
							</div>
							<button type='submit' className='login-btn'>
								Set Password
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default LoginCard;
