import { createApp } from 'vue';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createHead } from '@vueuse/head';
import { createAuth0 } from '@auth0/auth0-vue';
import App from './App.vue';

const routes = setupLayouts(generatedRoutes);
const router = createRouter({ routes, history: createWebHashHistory() });

const head = createHead();

const app = createApp(App);
app.use(router);
app.use(head);
app.use(
  createAuth0({
    domain: 'bibliopus.eu.auth0.com',
    client_id: 'CVLjTuVZnExezgagX4W8SYPHx4S183MJ',
    redirect_uri: window.location.origin,
  }),
);

app.mount('#app');
