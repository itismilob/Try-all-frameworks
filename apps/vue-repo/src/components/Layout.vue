<script setup lang="ts">
import router from '@/router';
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';

const isUser = ref(true);

const logoutHandler = () => {
  sessionStorage.removeItem('user');
  window.location.href = '/';
};

onMounted(() => {
  const userJson = sessionStorage.getItem('user');
  if (!userJson) {
    console.log('no user');
    isUser.value = false;
    router.push('/vue/not-auth');
    return;
  }

  const result = JSON.parse(userJson);
  console.log(result.framework);
  if (result.framework !== 'vue') {
    window.location.href = `/${result.framework}`;
  }
});
</script>

<template>
  <div class="framework-border vue-border">
    <header v-if="isUser">
      <RouterLink to="/vue">Vue home</RouterLink>
      <button @click="logoutHandler">Logout</button>
    </header>

    <main>
      <RouterView />
    </main>
    <div class="framework-title">
      Vue JS <img class="framework-icon" :src="`/public/vue.svg`" />
    </div>
  </div>
</template>
