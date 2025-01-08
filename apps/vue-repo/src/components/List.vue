<script setup lang="ts">
import "@styles/list.css";
</script>

<template>
  <div class="user-container default-shadow">
    <div>
      <img />
      <h1>username</h1>
    </div>
  </div>
  <div class="contents-container default-shadow">
    <div class="contents-header">
      <h2>Contents</h2>
      <button>
        <img alt="pen|" />
        write
      </button>
    </div>
    <ol>
      <li class="`${content.framework}-shadow ${content.framework}-hover`">
        <div class="contents-info">
          <div>
            <img />
            <h4>{content.username}</h4>
          </div>
          <img />
        </div>
        <div class="contents-date">
          <h3>{content.title}</h3>
          <h3 class="date">{format(content?.date, "yyyy/MM/dd")}</h3>
        </div>
      </li>
    </ol>
  </div>
</template>
