import { createRouter, createWebHistory } from 'vue-router';

// components
import List from '@/components/List.vue';
import Content from './components/Content.vue';
import Write from './components/Write.vue';
import NotAuth from './components/NotAuth.vue';
import NotFound from './components/NotFound.vue';

const routes = [
  {
    path: '/vue',
    children: [
      { path: '', component: List },
      { path: 'content/:contentID', component: Content },
      { path: 'write', component: Write },
      { path: 'not-auth', component: NotAuth },
    ],
  },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
