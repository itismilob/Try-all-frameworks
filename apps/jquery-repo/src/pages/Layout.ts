import $ from 'jquery';

export default function Layout(outlet: string) {
	let isUser = true;

	const logoutHandler = () => {
		sessionStorage.removeItem('user');
		window.location.href = '/';
	};

	$(document).ready(() => {
		const logoutBtn = $('#logout-btn');
		logoutBtn.on('click', logoutHandler);

		const userJson = sessionStorage.getItem('user');
		if (!userJson) {
			console.log('no user');
			isUser = false;
			window.location.href = '/jquery/#not-auth';
			return;
		}

		const result = JSON.parse(userJson);
		console.log(result.framework);
		if (result.framework !== 'jquery') {
			window.location.href = `/${result.framework}`;
		}
	});

	return `
		<div class="framework-border jquery-border">
			<div class="main-container">
				${
					isUser &&
					`
				<header>
					<a href="/jquery/#list">JQuery home</a>
					<button id="logout-btn">Logout</button>
				</header>`
				}
				<main>${outlet}</main>
			</div>
			<div class="framework-title">
				jQuery
				<img class="framework-icon" src="/public/jquery.svg" />
			</div>
		</div>`;
}
