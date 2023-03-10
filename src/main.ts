import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

console.log(import.meta.env.VITE_BASE_UTL);

createApp(App).mount('#app');
