import { createMemoryHistory, createRouter } from "vue-router";

// components
import List from "@/components/List.vue";
import Content from "./components/Content.vue";
import Write from "./components/Write.vue";
import NotAuth from "./components/NotAuth.vue";
import NotFound from "./components/NotFound.vue";

// content
// layout
// write
// notfound

const routes = [
  { path: "/", component: List },
  { path: "/content", component: Content },
  { path: "/write", component: Write },
  { path: "/not-auth", component: NotAuth },
  { path: "/*", component: NotFound },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
