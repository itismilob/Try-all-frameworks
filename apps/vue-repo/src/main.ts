import { createApp } from 'vue';
import router from '@/router';
import Layout from '@/components/Layout.vue';

import '@styles/main.css';
import '@styles/framework.css';
import '@styles/list.css';
import '@styles/content.css';
import '@styles/write.css';

createApp(Layout).use(router).mount('#app');
