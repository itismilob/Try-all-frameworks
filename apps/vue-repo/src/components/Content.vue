<script setup lang="ts">
import "@styles/content.css";
</script>

<template>
  <div class="content-info">
    <div>
      <h1>CONTENTTTTT</h1>
      <img class="framework-icon" />
    </div>
    <div>
      <div class="contents-info">
        <div>
          <img />
          <h4>{content?.username}</h4>
        </div>
      </div>
      <h3>{content && format(content?.date, "yyyy/MM/dd")}</h3>
    </div>
  </div>
  <div class="content-main default-shadow">
    <p>{content?.content}</p>
  </div>
  <div class="comment-input">
    <textarea class="default-shadow" ref="{commentInputRef}" />
    <button class="default-shadow">comment</button>
  </div>
  <div class="contents-container default-shadow">
    <h2>Comment</h2>
    <ol>
      <li key="{i}" class="{`${comment.framework}-shadow`}">
        <div class="contents-info">
          <div>
            <img />
            <h4>{comment.username}</h4>
          </div>
          <img />
        </div>
        <div class="contents-date">
          <h3>{comment.comment}</h3>
          <h3 class="date">{format(comment?.date, "yyyy/MM/dd")}</h3>
        </div>
      </li>
    </ol>
  </div>
</template>
