import { createApp } from 'vue';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createHead } from '@vueuse/head';
import App from './App.vue';

const routes = setupLayouts(generatedRoutes);
const router = createRouter({ routes, history: createWebHashHistory() });

const head = createHead();

const app = createApp(App);
app.use(router);
app.use(head);
app.mount('#app');
