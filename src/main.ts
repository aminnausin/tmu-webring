import '@/assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import nProgress from 'nprogress';
import router from '@/router';
import App from '@/App.vue';

import 'nprogress/nprogress.css';

const app = createApp(App);

nProgress.configure({
    showSpinner: false,
    // parent: '#nprogress-container',
});

app.use(createPinia());
app.use(router);

app.mount('#app');
