import $ from 'jquery';

import '@styles/main.css';
import '@styles/framework.css';
import '@styles/list.css';
import '@styles/content.css';
import '@styles/login.css';
import '@styles/write.css';
import '@styles/card.css';

import Layout from './pages/layout';
import List from './pages/list';
import Content from './pages/Content';
import Write from './pages/Write';
import NotAuth from './pages/NotAuth';
import NotFound from './pages/NotFound';

$(document).ready(() => {
	loadPage();
});

$(window).on('hashchange', () => {
	loadPage();
});

const loadPage = async () => {
	const currentPage = location.hash.split('/')[0];
	console.log(currentPage);

	let page: Function;

	// routing
	switch (currentPage) {
		case '#list':
			page = List;
			break;
		case '#content':
			page = Content;
			break;
		case '#write':
			page = Write;
			break;
		case '#not-auth':
			page = NotAuth;
			break;
		default:
			page = NotFound;
	}
	Layout(page, '#app');
};

export const htmlRender = (page: string) => {
	$('#app').html(page);
};
