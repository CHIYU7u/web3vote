import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Vant from 'vant';
import 'vant/lib/index.css';
//import './style.less';

const app = createApp(App);

app.use(router);
app.use(Vant); // 这行代码全局注册了 Vant 组件库

app.mount('#app');
