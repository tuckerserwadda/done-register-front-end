import { createRouter, createWebHistory } from "vue-router";
import PatientRegister from "../components/PatientRegister.vue"
import ViewPatientRegister from "../views/ViewPatientRegister.vue"


const routes = [
  {
    path: "/",
    name: "PatientRegister",
    component: PatientRegister,
  },
  {
    path: "/admin/patients",
    name: "ViewPatientRegister",
    component: ViewPatientRegister,
  },




];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
