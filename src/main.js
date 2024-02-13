import { createApp } from 'vue';
import App from './App.vue';
import { BIconPencilSquare, BIconTrash, BIconSearch, BIconFilePdf, BIconTicketDetailed, BIconClockHistory, BIconCheckCircle } from "bootstrap-icons-vue";
import VueSweetalert2 from "vue-sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import router from './router/router';

import axios from 'axios';

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

// axios.defaults.baseURL = "http://localhost:8000/api"
axios.defaults.baseURL = "https://nuts.rda.gov.ge/api"

const app = createApp(App);

app.component("BIconPencilSquare", BIconPencilSquare);
app.component("BIconTrash", BIconTrash);
app.component("BIconFilePdf", BIconFilePdf);
app.component("BIconSearch", BIconSearch);
app.component("BIconTicketDetailed", BIconTicketDetailed);
app.component("BIconClockHistory", BIconClockHistory);
app.component("BIconCheckCircle", BIconCheckCircle);

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