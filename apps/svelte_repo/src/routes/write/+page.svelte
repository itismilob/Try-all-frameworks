<script lang="ts">
	import type { userType } from 'types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let userData = $state<userType>();
	let titleRef = $state('');
	let contentRef = $state('');
	const submitHandler = async () => {
		if (!userData) return;
		if (!titleRef || !contentRef) return;

		const userID = userData.id;
		const title = titleRef;
		const content = contentRef;
		console.log(userID, title, content);

		if (/^\s*$/.test(title)) {
			alert('title is empty');
			return;
		}
		if (/^\s*$/.test(content)) {
			alert('content is empty');
			return;
		}

		const response = await fetch('/api/contents', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ title, content, userID })
		});

		if (response.ok) {
			const result = await response.json();
			goto(`/svelte/content/${result}`);
		}
	};

	onMount(() => {
		const userJson = sessionStorage.getItem('user');
		if (!userJson) return;
		const result = JSON.parse(userJson);
		userData = result;
	});
</script>

<h1>Create Post</h1>
<input class="title-input default-shadow" placeholder="Title" bind:value={titleRef} />
<textarea class="content-input default-shadow" placeholder="Content" bind:value={contentRef}
></textarea>
<div class="button-container">
	<button onclick={submitHandler}>Submit</button>
	<a href="/svelte/">Discard</a>
</div>
