import $ from 'jquery';

export default function NotAuth(parent: string) {
	const render = () => {
		const component = `
      <h1>Please Login</h1>
      <a href="/">Go back</a>
	`;

		$(parent).html(component);
	};

	render();
}
