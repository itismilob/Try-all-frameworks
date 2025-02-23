<script lang="ts">
	let { children } = $props();
	import '@styles/main.css';
	import '@styles/framework.css';
</script>

<svelte:head>
	<title>Svelte</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="framework-border svelte-border">
	<main>
		<header>
			<a href="/svelte">Svelte home</a>
			<button>Logout</button>
		</header>
		{@render children()}
	</main>
	<div class="framework-title">
		SvelteKit
		<img class="framework-icon" src="/public/svelte.svg" alt="framework-icon" />
	</div>
</div>
