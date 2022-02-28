import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// add prime vue components
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/saga-blue/theme.css"       //theme
import "primevue/resources/primevue.min.css"                 //core css
import "primeicons/primeicons.css" 
import Button from "primevue/button";  
import Card from "primevue/card";  
import InputText from 'primevue/inputtext'; 
import Message from 'primevue/message'; 
import DataTable from 'primevue/datatable';; 
import Column from 'primevue/column'; 
// import Calendar from 'primevue/calendar';; 
createApp(App)
.use(store)
.use(router)
.use(PrimeVue)
.component('Button', Button)
.component('Card', Card)
.component('InputText', InputText)
.component('Message', Message)
.component('DataTable', DataTable)
.component('Column', Column)
// .component('Calender', Calendar)
.mount("#app");
