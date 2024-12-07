import { createWebHistory, createRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

import TemplateLayoutView from "@/layouts/TemplateLayoutView.vue";
import DashboardView from "@/pages/DashboardView.vue";
import PageNotFound from "../components/PageNotFound.vue";
import ApiGatewayView from "../pages/ApiGatewayView.vue";
import LoginView from "../pages/LoginView.vue";

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/login", name: "login", component: LoginView },
  {
    /*
    // before auth
    path: "/",
    component: TemplateLayoutView,
    children: [
      { path: "/dashboard", component: DashboardView },
      { path: "/order", component: OrderView },
    ],
    */

    path: "/",
    meta: { requiresAuth: true },
    component: TemplateLayoutView,
    children: [
      { path: "/dashboard", name: "DashboardView", component: DashboardView },
      {
        path: "/api-gateway",
        name: "ApiGatewayView",
        component: ApiGatewayView,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "PageNotFoundn", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else if (
    to.path === "/login" &&
    authStore.isAuthenticated &&
    !!authStore.token
  ) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
