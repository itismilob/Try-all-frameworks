<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { userType } from 'types';
import router from '@/router';

const userData = ref<userType>();

const titleRef = ref();
const contentRef = ref();

const submitHandler = async () => {
	if (!userData.value) return;
	if (!titleRef.value || !contentRef.value) return;

	const userID = userData.value.id;
	const title = titleRef.value.value;
	const content = contentRef.value.value;
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
		router.push(`/vue/content/${result}`);
	}
};

onMounted(() => {
	const userJson = sessionStorage.getItem('user');
	if (!userJson) return;
	const result = JSON.parse(userJson);
	userData.value = result;
});
</script>

<template>
	<h1>Create Post</h1>
	<input class="title-input default-shadow" placeholder="Title" ref="titleRef" />
	<textarea class="content-input default-shadow" placeholder="Content" ref="contentRef" />
	<div class="button-container">
		<button @click="submitHandler">Submit</button>
		<RouterLink to="-1">Discard</RouterLink>
	</div>
</template>
