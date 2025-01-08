import { createApp } from 'vue';
import router from '@/router';
import Layout from '@/components/Layout.vue';

import '@styles/main.css';
import '@styles/framework.css';

createApp(Layout).use(router).mount('#app');
