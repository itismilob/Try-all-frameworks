import { createRouter, createWebHistory } from 'vue-router';

// components
import List from '@/pages/List.vue';
import Content from '@/pages/Content.vue';
import Write from '@/pages/Write.vue';
import NotAuth from '@/pages/NotAuth.vue';
import NotFound from '@/pages/NotFound.vue';

const routes = [
	{
		path: '/vue',
		children: [
			{ path: '', component: List },
			{ path: 'content/:contentID', component: Content },
			{ path: 'write', component: Write },
			{ path: 'not-auth', component: NotAuth }
		]
	},
	{ path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
