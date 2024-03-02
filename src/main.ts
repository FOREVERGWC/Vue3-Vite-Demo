import {createApp} from 'vue'
import App from './App.vue'
import naive from "naive-ui";
import router from "./router";
import './assets/css/reset.css'

const app = createApp(App)
app.use(router).use(naive).mount('#app')
