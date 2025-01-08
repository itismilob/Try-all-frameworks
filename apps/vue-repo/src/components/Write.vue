<script setup lang="ts">
import "@styles/write.css";
</script>

<template>
  <h1>Create Post</h1>
  <input
    class="title-input default-shadow"
    placeholder="Title"
    ref="{titleRef}"
  />
  <textarea
    class="content-input default-shadow"
    placeholder="Content"
    ref="{contentRef}"
  />
  <div class="button-container">
    <button>Submit</button>
    <button>Discard</button>
  </div>
</template>
