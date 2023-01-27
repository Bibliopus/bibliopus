import { defineCorsEventHandler } from '@nozomuikuta/h3-cors';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.h3App.use(defineCorsEventHandler({
    origin: '*',
    methods: '*',
    allowHeaders: '*',
    credentials: true,
    exposeHeaders: '*',
  }));
});
