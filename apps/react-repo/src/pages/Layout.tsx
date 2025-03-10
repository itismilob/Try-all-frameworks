import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Layout() {
	const navigate = useNavigate();
	const [isUser, setIsUser] = useState(true);

	const logoutHandler = () => {
		sessionStorage.removeItem('user');
		window.location.href = '/';
	};

	useEffect(() => {
		const userJson = sessionStorage.getItem('user');
		if (!userJson) {
			console.log('no user');
			setIsUser(false);
			navigate('/react/not-auth');
			return;
		}

		const result = JSON.parse(userJson);
		console.log(result.framework);
		if (result.framework !== 'react') {
			window.location.href = `/${result.framework}`;
		}
	});

	return (
		<div className="framework-border react-border">
			<div className="main-container">
				{isUser && (
					<header>
						<Link to="/react">React home</Link>
						<button onClick={logoutHandler}>Logout</button>
					</header>
				)}
				<main>
					<Outlet />
				</main>
			</div>
			<div className="framework-title">
				React
				<img className="framework-icon" src="/public/react.svg" />
			</div>
		</div>
	);
}
