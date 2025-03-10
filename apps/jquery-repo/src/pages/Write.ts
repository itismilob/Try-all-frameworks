import $ from 'jquery';
import { userType } from 'types';
export default function Write(parent: string) {
	let user: userType = {
		id: '',
		username: '',
		framework: '',
		profile: ''
	};

	const submitHandler = async () => {
		if (!user) return;

		const userID = user.id;
		const title = $('.title-input').val() as string;
		const content = $('.content-input').val() as string;

		if (/^\s*$/.test(title)) {
			alert('title is empty');
			return;
		}
		if (/^\s*$/.test(content)) {
			alert('content is empty');
			return;
		}

		console.log(userID, title, content);

		const response = await fetch('/api/contents', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, content, userID })
		});

		if (response.ok) {
			const result = await response.json();
			location.href = `/jquery/#content/${result}`;
		}
	};

	const discardHandler = () => {
		location.href = '/jquery/#list';
	};

	const render = () => {
		const component = `
      <h1>Create Post</h1>
      <input
        class='title-input default-shadow'
        placeholder='Title'
      />
      <textarea
        class='content-input default-shadow'
        placeholder='Content'
      ></textarea>
      <div class='button-container'>
        <button id='submit-btn'>Submit</button>
        <button id='discard-btn'>Discard</button>
      </div>
		`;

		$(parent).html(component);
	};

	const init = () => {
		const userJson = sessionStorage.getItem('user');
		if (!userJson) return;
		user = JSON.parse(userJson);

		render();

		$('#submit-btn').on('click', submitHandler);
		$('#discard-btn').on('click', discardHandler);
	};

	init();
}
