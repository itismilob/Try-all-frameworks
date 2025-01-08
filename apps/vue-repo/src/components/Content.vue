<script setup lang="ts">
import '@styles/content.css';
import type { userType, commentType, contentType } from 'types';
import { onMounted, ref, watch } from 'vue';
import { format } from 'date-fns';
import { useRoute } from 'vue-router';

const content = ref<contentType>();
const comments = ref<commentType[]>([]);
const userData = ref<userType>();

const commentInputRef = ref();

const route = useRoute();
const contentID = route.params.contentID;

const fetchContentData = async () => {
  if (!contentID) {
    console.log('no content id');
    return;
  }

  const response = await fetch(`/api/contents/${contentID}`, {
    method: 'get',
  });
  if (!response.ok) return;

  const contentResult: contentType = await response.json();
  content.value = contentResult;

  console.log(contentResult);
};

const fetchCommentsData = async () => {
  if (!content.value) {
    console.log('no content');
    return;
  }

  const response = await fetch(`/api/comments?contentID=${content.value.id}`, {
    method: 'get',
  });
  if (!response.ok) return;

  const commentsResult: commentType[] = await response.json();
  comments.value = commentsResult;
};

onMounted(() => {
  const userJson = sessionStorage.getItem('user');
  if (!userJson) return;
  const result = JSON.parse(userJson);
  userData.value = result;

  fetchContentData();
});

watch(content, () => {
  fetchCommentsData();
});

const commentClickHandler = async () => {
  if (!userData.value) return;

  const commentInput = commentInputRef.value?.value;
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
      userID: userData.value.id,
      contentID,
      comment: commentInput,
    }),
  });

  if (response.ok) {
    if (commentInputRef.value) commentInputRef.value.value = '';

    await fetchCommentsData();
  }
};
</script>

<template>
  <div :class="`content-info ${content?.framework}-shadow`">
    <div>
      <h1>{{ content?.title }}</h1>
      <img :src="`/public/${content?.framework}.svg`" class="framework-icon" />
    </div>
    <div>
      <div class="contents-info">
        <div>
          <img :src="content?.profile" />
          <h4>{{ content?.username }}</h4>
        </div>
      </div>
      <h3>{{ content && format(content?.date, 'yyyy/MM/dd') }}</h3>
    </div>
  </div>
  <div class="content-main default-shadow">
    <p>{{ content?.content }}</p>
  </div>
  <div class="comment-input">
    <textarea class="default-shadow" ref="commentInputRef" />
    <button @click="commentClickHandler" class="default-shadow">comment</button>
  </div>
  <div class="contents-container default-shadow">
    <h2>Comment</h2>
    <ol>
      <li
        v-if="Array.isArray(comments) && comments[0]"
        v-for="comment in comments"
        :key="comment.id"
        :class="`${comment.framework}-shadow`"
      >
        <div class="contents-info">
          <div>
            <img :src="comment.profile" />
            <h4>{{ comment.username }}</h4>
          </div>
          <img :src="`/public/${comment.framework}.svg`" />
        </div>
        <div class="contents-date">
          <h3>{{ comment.comment }}</h3>
          <h3 class="date">{{ format(comment?.date, 'yyyy/MM/dd') }}</h3>
        </div>
      </li>

      <div v-else>No contents</div>
    </ol>
  </div>
</template>
