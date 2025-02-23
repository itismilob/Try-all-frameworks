<script lang="ts">
	import { format } from 'date-fns';
	import type { cardProperty } from 'types';

	let props: cardProperty = $props();
	let item = $derived(props.content || props.comment);
</script>

{#if item}
	<li
		onclick={() => {
			props.cardClickHandler?.(item.id);
		}}
		class="{item.framework}-shadow {item.framework}-hover"
	>
		<div class="contents-info">
			<div>
				<img src={item.profile} alt="user profile" />
				<h4>{item.username}</h4>
			</div>
			<img src={`/public/${item.framework}.svg`} alt="framework icon" />
		</div>
		<div class="contents-date">
			{#if props.content}
				<h3>{props.content.title}</h3>
			{:else if props.comment}
				<h3>{props.comment.comment}</h3>
			{/if}

			<h3 class="date">{format(item?.date, 'yyyy/MM/dd')}</h3>
		</div>
	</li>
{/if}
