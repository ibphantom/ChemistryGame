import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// Register global components or plugins if needed

app.mount('#app');

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(reg => {
      console.log('Service Worker registered: ', reg);
    })
    .catch(err => {
      console.log('Service Worker registration failed: ', err);
    });
}
