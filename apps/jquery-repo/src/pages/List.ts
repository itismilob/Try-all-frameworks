import type { userType, contentType } from 'types';
import Card from '@/components/Card';
import $ from 'jquery';

export default function List(parent: string) {
	let userData: userType = {
		id: '',
		username: '',
		profile: '',
		framework: 'jquery'
	};
	let contents: contentType[] = [];

	const fetchData = async () => {
		let response = await fetch('/api/contents', { method: 'get' });
		if (response.ok) {
			const result = await response.json();
			contents = result;
		}
	};

	const loadUserData = () => {
		const userJson = sessionStorage.getItem('user');
		if (!userJson) {
			return false;
		}
		const result = JSON.parse(userJson);
		userData = result;
		return true;
	};

	const listClickHandler = (id: string) => {
		window.location.href = `/jquery/#content/${id}`;
	};

	const render = () => {
		const component = `
	<div class='user-container ${userData?.framework}-shadow'>
	  <div>
		<img src='${userData?.profile}' alt='user profile'/>
		<h1>${userData?.username}</h1>
	  </div>
	</div>
	<div class='contents-container default-shadow'>
	  <div class='contents-header'>
		<h2>Contents</h2>
		<a href='/jquery/#write'>
		  <img src='/public/pen.svg' alt='pen|' />
		  write
		</a>
	  </div>
	  <ol>${
			contents[0]
				? contents
						.map(
							(content) =>
								`<li id="li-${content.id}"
				  class="${content.framework}-shadow ${content.framework}-hover"
			  ></li>`
						)
						.join('')
				: '<div>No contents</div>'
		}</ol>
	</div>
  `;

		$(parent).html(component);
	};

	const init = async () => {
		loadUserData();
		await fetchData();
		render();
		for (const content of contents) {
			Card({ content, cardClickHandler: listClickHandler });
		}
	};

	init();
}
