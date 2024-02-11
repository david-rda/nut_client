import { createApp } from 'vue';
import App from './App.vue';
import { BIconPencilSquare, BIconTrash } from "bootstrap-icons-vue";
import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import router from './router/router';

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/api"

const app = createApp(App);

app.component("BIconPencilSquare", BIconPencilSquare);
app.component("BIconTrash", BIconTrash);

app.use(router);
app.use(VueSweetalert2);

app.mount('#app');