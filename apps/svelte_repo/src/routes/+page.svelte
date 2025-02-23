<!-- List page -->

<script lang="ts">
	import '@styles/list.css';
	import type { contentType, userType } from 'types';
	import Card from '../components/card.svelte';

	let userData: userType | undefined = $state();
	let contents: contentType[] | undefined = $state();

	const fetchData = async () => {
		let response = await fetch('/api/contents', { method: 'get' });
		if (response.ok) {
			const result = await response.json();
			contents = result;
			console.log(result);
		}
	};

	$effect(() => {
		console.log('mounted');
		const userJson = sessionStorage.getItem('user');
		if (!userJson) {
			return;
		}
		const result = JSON.parse(userJson);
		userData = result;

		fetchData();
	});

	const listClickHandler = (id: string) => {
		window.location.href = `/svelte/content/${id}`;
	};
</script>

<div class="user-container {userData?.framework}-shadow">
	<div>
		<img src={userData?.profile} alt="user profile" />
		<h1>{userData?.username}</h1>
	</div>
</div>
<div class="contents-container default-shadow">
	<div class="contents-header">
		<h2>Contents</h2>
		<a href="/svelte/write">
			<img src="/public/pen.svg" alt="pen|" />
			write
		</a>
	</div>
	<ol>
		{#if contents}
			{#each contents as content (content.id)}
				<Card {content} cardClickHandler={listClickHandler} />
			{/each}
		{:else}
			<div>No contents</div>
		{/if}
	</ol>
</div>
