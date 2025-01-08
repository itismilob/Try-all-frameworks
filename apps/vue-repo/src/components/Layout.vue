<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="framework-border vue-border">
    <main>
      <RouterView />
    </main>
    <div class="framework-title">
      Vue JS
      <image class="framework-icon" src="/public/vue.svg" />
    </div>
  </div>
</template>
