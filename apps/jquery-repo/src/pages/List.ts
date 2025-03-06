import type { userType } from 'types';
// import $ from 'jquery';

export default function List() {
	let userData: userType = {
		id: '',
		username: '',
		profile: '',
		framework: 'jquery'
	};
	// let contents: contentType[] = [];

	// const fetchData = async () => {
	// 	let response = await fetch('/api/contents', { method: 'get' });
	// 	if (response.ok) {
	// 		const result = await response.json();
	// 		contents = result;
	// 	}
	// };

	const loadUserData = () => {
		const userJson = sessionStorage.getItem('user');
		if (!userJson) {
			return false;
		}
		const result = JSON.parse(userJson);
		userData = result;
		console.log(userData);
		return true;
	};

	// const listClickHandler = (id: string) => {
	// 	window.location.href = `/jquery/#content/${id}`;
	// };

	const render = () => {
		const isUserLoaded = loadUserData();
		if (!isUserLoaded) {
			return '';
		}

		// fetchData();
		return `
          <div class='user-container ${userData?.framework}-shadow'>
            <div>
              <img src='${userData?.profile}' alt='user profile'/>
              <h1>${userData?.username}</h1>
            </div>
          </div>
          <div class='contents-container default-shadow'>
            <div class='contents-header'>
              <h2>Contents</h2>
              <a href='/#write'>
                <img src='/public/pen.svg' alt='pen|' />
                write
              </a>
            </div>
            <ol>
            contents
            </ol>
          </div>
        `;
	};

	return render();
}
