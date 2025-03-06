<!-- content page -->
<script lang="ts">
	import type { userType, commentType, contentType } from 'types';
	import { format } from 'date-fns';
	import Card from '@/components/card.svelte';
	import { onMount } from 'svelte';

	let content: contentType | undefined = $state();
	let comments: commentType[] = $state([]);
	let userData: userType | undefined = $state();

	let { data } = $props();

	let commentInputRef: string = $state('');
	const contentID = data.id;

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

	onMount(() => {
		const userJson = sessionStorage.getItem('user');
		if (!userJson) return;
		const result = JSON.parse(userJson);
		userData = result;

		fetchContentData();
	});

	$effect(() => {
		if (content) {
			fetchCommentsData();
		}
	});

	const commentClickHandler = async () => {
		if (!userData) return;

		if (/^\s*$/.test(commentInputRef)) {
			alert('comments is empty');
			return;
		}

		const response = await fetch('/api/comments', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			//userID, contentID, comment + date
			body: JSON.stringify({
				userID: userData.id,
				contentID,
				comment: commentInputRef
			})
		});

		if (response.ok) {
			commentInputRef = '';

			await fetchCommentsData();
		}
	};
</script>

{#if content}
	<div class="content-info {content.framework}-shadow">
		<div>
			<h1>{content.title}</h1>
			<img src="/public/{content.framework}.svg" alt="framework-icon" class="framework-icon" />
		</div>
		<div>
			<div class="contents-info">
				<div>
					<img src={content.profile} alt="user profile" />
					<h4>{content.username}</h4>
				</div>
			</div>
			<h3>{content && format(content.date, 'yyyy/MM/dd')}</h3>
		</div>
	</div>
	<div class="content-main default-shadow">
		<p>{content.content}</p>
	</div>
	<div class="comment-input">
		<textarea class="default-shadow" bind:value={commentInputRef}></textarea>
		<button onclick={commentClickHandler} class="default-shadow">comment</button>
	</div>
	<div class="contents-container default-shadow">
		<h2>Comment</h2>
		<ol>
			{#if Array.isArray(comments) && comments[0]}
				{#each comments as comment (comment.id)}
					<Card {comment} />
				{/each}
			{:else}
				<div>No contents</div>
			{/if}
		</ol>
	</div>
{/if}
