<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { RouterLink } from 'vue-router';
import type { contentType, userType } from 'types';
import router from '@/router';
import Card from '@/components/Card.vue';

//--------

const userData = ref<userType>();
const contents = ref<contentType[]>([]);

const fetchData = async () => {
	let response = await fetch('/api/contents', { method: 'get' });
	if (response.ok) {
		const result = await response.json();
		contents.value = result;
		console.log(result);
	}
};

onMounted(() => {
	console.log('mounted');
	const userJson = sessionStorage.getItem('user');
	if (!userJson) {
		return;
	}
	const result = JSON.parse(userJson);
	userData.value = result;

	fetchData();
});

const listClickHandler = (id: string) => {
	router.push(`/vue/content/${id}`);
};
</script>

<template>
	<div :class="`user-container ${userData?.framework}-shadow`">
		<div>
			<img :src="userData?.profile" alt="user profile" />
			<h1>{{ userData?.username }}</h1>
		</div>
	</div>
	<div class="contents-container default-shadow">
		<div class="contents-header">
			<h2>Contents</h2>
			<RouterLink to="/vue/write">
				<img :src="`/public/pen.svg`" alt="pen|" />
				write
			</RouterLink>
		</div>
		<ol>
			<Card
				v-if="Array.isArray(contents) && contents[0]"
				v-for="content in contents"
				:key="content.id"
				:content="content"
				:card-click-handler="
					() => {
						listClickHandler(content.id);
					}
				"
			/>

			<div v-else>No contents</div>
		</ol>
	</div>
</template>
