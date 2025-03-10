import $ from 'jquery';
export default function Layout(outlet: Function, parent: string) {
	let isUser = true;

	const logoutHandler = () => {
		sessionStorage.removeItem('user');
		window.location.href = '/';
	};

	const checkUser = () => {
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
	};

	const render = () => {
		const component = `
			<div class="framework-border jquery-border">
				<div class="main-container">
					${
						isUser
							? `
				<header>
					<a href="/jquery/#list">JQuery home</a>
					<button id="logout-btn">Logout</button>
				</header>`
							: ''
					}
					<main id="outlet"></main>
				</div>
				<div class="framework-title">
					jQuery
					<img class="framework-icon" src="/public/jquery.svg" />
				</div>
			</div>`;
		$(parent).html(component);
	};

	const init = () => {
		checkUser();
		render();
		$('#logout-btn').on('click', logoutHandler);
		outlet('#outlet');
	};

	init();
}
