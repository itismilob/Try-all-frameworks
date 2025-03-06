<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import '@styles/main.css';
	import '@styles/framework.css';
	import '@styles/list.css';
	import '@styles/content.css';
	import '@styles/write.css';

	let { children } = $props();
	let isUser = $state(true);

	const logoutHandler = () => {
		sessionStorage.removeItem('user');
		window.location.href = '/';
	};

	onMount(() => {
		const userJson = sessionStorage.getItem('user');
		if (!userJson) {
			console.log('no user');
			isUser = false;
			goto('/svelte/not-auth');
			return;
		}

		const result = JSON.parse(userJson);
		console.log(result.framework);
		if (result.framework !== 'svelte') {
			window.location.href = `/${result.framework}`;
		}
	});
</script>

<svelte:head>
	<title>Svelte</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="framework-border svelte-border">
	<div class="main-container">
		{#if isUser}
			<header>
				<a href="/svelte/">Svelte home</a>
				<button onclick={logoutHandler}>Logout</button>
			</header>
		{/if}
		<main>
			{@render children()}
		</main>
	</div>
	<div class="framework-title">
		SvelteKit
		<img class="framework-icon" src="/public/svelte.svg" alt="framework-icon" />
	</div>
</div>
