import Vue from "vue";
import VueRouter from "vue-router";

import basics from "./modules/basics";

Vue.use(VueRouter);

const routes = [...basics];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});
export default router;
