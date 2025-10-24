import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import Projects from "../pages/Projects.vue";
import Contact from "../pages/Contact.vue";

// Import other pages when you create them
// import Projects from '../pages/Projects.vue';
// import Contact from '../pages/Contact.vue';

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  // Add more routes here as you create pages
  // {
  //   path: '/projects',
  //   name: 'Projects',
  //   component: Projects
  // },
  // {
  //   path: '/contact',
  //   name: 'Contact',
  //   component: Contact
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
