<script setup lang="ts">
import { format } from 'date-fns';
import type { cardProperty } from 'types';
import { computed } from 'vue';
import '@styles/card.css';

const props = defineProps(['content', 'comment', 'cardClickHandler']) as cardProperty;

const item = computed(() => props.content || props.comment);
</script>

<template>
	<li v-if="item" :class="`${item.framework}-shadow ${item.framework}-hover`">
		<button
			@click="
				() => {
					if (item) props.cardClickHandler?.(item.id);
				}
			"
		>
			<div class="contents-info">
				<div>
					<img :src="item.profile" alt="user profile" />
					<h4>{{ item.username }}</h4>
				</div>
				<img :src="`/public/${item.framework}.svg`" alt="framework icon" />
			</div>
			<div class="contents-date">
				<h3 v-if="props.content">{{ props.content.title }}</h3>
				<h3 v-if="props.comment">{{ props.comment.comment }}</h3>
				<h3 class="date">{{ format(item.date, 'yyyy/MM/dd') }}</h3>
			</div>
		</button>
	</li>
</template>
