import $ from 'jquery';
import { commentType, userType, contentType } from 'types';
import { format } from 'date-fns';
import Card from '@/components/Card';

export default function Content(parent: string) {
	let content: contentType = {
		id: '',
		title: '',
		content: '',
		date: new Date(),
		userID: '',
		username: '',
		framework: '',
		profile: ''
	};
	let comments: commentType[] = [];
	let user: userType = {
		id: '',
		username: '',
		framework: '',
		profile: ''
	};
	let contentID: string = location.href.split('/').pop() || '';
	console.log(contentID);

	const fetchContentData = async () => {
		if (!contentID) {
			console.log('no content id');
			return;
		}

		const response = await fetch(`/api/contents/${contentID}`, {
			method: 'get'
		});
		if (!response.ok) return;

		const contentResult: contentType = await response.json();
		content = contentResult;

		console.log(contentResult);
	};

	const fetchCommentsData = async () => {
		if (!content) {
			console.log('no content');
			return;
		}

		const response = await fetch(`/api/comments?contentID=${content.id}`, {
			method: 'get'
		});
		if (!response.ok) return;

		const commentsResult: commentType[] = await response.json();
		comments = commentsResult;
	};

	const commentClickHandler = async () => {
		if (!user) return;

		const commentInput = $('#commentInputRef').val() as string;
		console.log(commentInput);

		if (commentInput && /^\s*$/.test(commentInput)) {
			alert('comments is empty');
			return;
		}

		const response = await fetch('/api/comments', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			//userID, contentID, comment + date
			body: JSON.stringify({
				userID: user.id,
				contentID,
				comment: commentInput
			})
		});

		if (response.ok) {
			$('#commentInputRef').val('');

			await fetchCommentsData();
			render();
		}
	};

	const render = () => {
		const component = `
      <div class="content-info ${content?.framework}-shadow">
        <div>
          <h1>${content?.title}</h1>
          ${
						content
							? `
            <img
              class="framework-icon"
              src="/public/${content?.framework}.svg"
            />
          `
							: ''
					}
        </div>
        <div>
          <div class="contents-info">
            <div>
              <img src="${content?.profile}" />
              <h4>${content?.username}</h4>
            </div>
          </div>
          <h3>${content ? format(content?.date, 'yyyy/MM/dd') : ''}</h3>
        </div>
      </div>
      <div class="content-main default-shadow">
        <p>${content?.content}</p>
      </div>
      <div class="comment-input">
        <textarea class="default-shadow" id="commentInputRef"></textarea>
        <button id="commentButton" class="default-shadow">
          comment
        </button>
      </div>
      <div class="contents-container default-shadow">
        <h2>Comment</h2>
        <ol>
          ${
						Array.isArray(comments) && comments[0]
							? comments
									.map(
										(comment) =>
											`<li id="li-${comment.id}"
				  class="${comment.framework}-shadow ${comment.framework}-hover"
			  ></li>`
									)
									.join('')
							: '<div>No comments</div>'
					}
        </ol>
      </div>
	`;

		$(parent).html(component);

		$('#commentButton').on('click', commentClickHandler);
		for (const comment of comments) {
			Card({ comment });
		}
	};

	const init = async () => {
		const userJson = sessionStorage.getItem('user');
		if (!userJson) return;
		const userData = JSON.parse(userJson);
		user = userData;

		await fetchContentData();
		await fetchCommentsData();
		render();
	};

	init();
}
