import $ from 'jquery';

export default function NotFound(parent: string) {
	const render = () => {
		const component = `
			<h1>404</h1>
			<div>Not Found</div>
	`;

		$(parent).html(component);
	};

	render();
}
