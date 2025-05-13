import { createApp } from 'vue';
import App from './App.vue';
import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import router from './router/router';

import axios from 'axios';

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

import { Vue3TailwindPagination } from "vue-3-tailwind-css-pagination";

// heroicon ბიბლიოთეკა
import { ArrowRightStartOnRectangleIcon, Cog8ToothIcon, ChevronDownIcon, Bars3Icon, ArrowDownTrayIcon, PlusIcon, MagnifyingGlassIcon, PencilSquareIcon, EyeIcon, ClockIcon } from "@heroicons/vue/24/outline";

// axios.defaults.baseURL = "http://localhost:8000/api"
axios.defaults.baseURL = "https://nuts.rda.gov.ge/api";

axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
  
        router.push("/");
      }
      return Promise.reject(error);
    }
);

const app = createApp(App);

app.component('Vue3TailwindPagination', Vue3TailwindPagination)

// აიკონები
app.component("ArrowRightStartOnRectangleIcon", ArrowRightStartOnRectangleIcon);
app.component("Cog8ToothIcon", Cog8ToothIcon);
app.component("ChevronDownIcon", ChevronDownIcon);
app.component("Bars3Icon", Bars3Icon);
app.component("ArrowDownTrayIcon", ArrowDownTrayIcon);
app.component("PlusIcon", PlusIcon);
app.component("MagnifyingGlassIcon", MagnifyingGlassIcon);
app.component("PencilSquareIcon", PencilSquareIcon);
app.component("EyeIcon", EyeIcon);
app.component("ClockIcon", ClockIcon);

app.use(
    VueTippy,
    {
        directive: 'tippy',
        component: 'tippy',
        componentSingleton: 'tippy-singleton',
        defaultProps: {
            placement: 'top',
            allowHTML: true,
        },
    }
)

app.use(router);
app.use(VueSweetalert2);

app.mount('#app');