import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { contentType, userType } from 'types';
import '@styles/list.css';
import Card from '../components/Card';

export default function List() {
	const [userData, setUserData] = useState<userType>();
	const [contents, setContents] = useState<contentType[]>();

	const navigate = useNavigate();

	const fetchData = async () => {
		let response = await fetch('/api/contents', { method: 'get' });
		if (response.ok) {
			const result = await response.json();
			setContents(result);
		}
	};

	useEffect(() => {
		const userJson = sessionStorage.getItem('user');
		if (!userJson) {
			return;
		}
		const result = JSON.parse(userJson);
		setUserData(result);

		fetchData();
	}, []);

	const listClickHandler = (id: string) => {
		navigate(`/react/content/${id}`);
	};

	return (
		<>
			<div className={`user-container ${userData?.framework}-shadow`}>
				<div>
					<img src={userData?.profile} alt="user profile" />
					<h1>{userData?.username}</h1>
				</div>
			</div>
			<div className="contents-container default-shadow">
				<div className="contents-header">
					<h2>Contents</h2>
					<Link to={`/react/write`}>
						<img src="/public/pen.svg" alt="pen|" />
						write
					</Link>
				</div>
				<ol>
					{contents ? (
						contents.map((content: contentType, i: number) => (
							<Card key={i} content={{ ...content }} cardClickHandler={listClickHandler} />
						))
					) : (
						<div>No contents</div>
					)}
				</ol>
			</div>
		</>
	);
}
