import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../containers/Home.vue";
import Dashboard from "../containers/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/dashboard/:user_name",
    name: "dashboard",
    component: Dashboard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
